var rocky = require('rocky');
var drawAPI = require('./draw');

// Global object to store weather data
var stockData;

rocky.on('draw', function(event) {
  var ctx = event.context;
  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  drawAPI.drawDigital(ctx, w * (1/5) + 10, h * (1/5) - 5, 'white', '49px Roboto-subset' );
  drawAPI.drawDay(ctx,  w * (4/5) - 5, h * (1/5) - 15);
  // Draw Weather on the bottom of the screen, if available
  if (stockData) {
    drawAPI.drawStock(ctx, stockData, w * (4/5) - 15, h * (3/5) - 10);
  }
});

rocky.on('minutechange', function(event) {
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});


rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.stockData) {
    // Save the weather data
    stockData = message.stockData;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});