Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;

  if (message.fetch) {
    
    var url = 'https://query.yahooapis.com/v1/public/yql' + 
        '?q=select * from yahoo.finance.quotes where symbol in ' +
        '("YHOO")&format=json&env=store://datatables.org/alltableswithkeys&callback=';

      request(url, 'GET', function(respText) {
        var stockData = JSON.parse(respText);

        Pebble.postMessage({
          'stockData': {
            'symbol': stockData.query.results.quote.symbol,
            'Ask': stockData.query.results.quote.Ask,
            'Bid': stockData.query.results.quote.Bid
          }
        });
      });
  }
});

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    // HTTP 4xx-5xx are errors:
    if (xhr.status >= 400 && xhr.status < 600) {
      console.error('Request failed with HTTP status ' + xhr.status + ', body: ' + this.responseText);
      return;
    }
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}