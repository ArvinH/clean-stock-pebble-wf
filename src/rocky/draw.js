module.exports = {
  drawDigital: function drawDigital(ctx, cx, cy, color, font) {
    var hourAndMin = new Date()
                .toLocaleTimeString()
                .split(':')
                .splice(0,2);
    var hourText = hourAndMin[0];
    var minutesText = hourAndMin[1];
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.font = font;
    ctx.fillText(hourText, cx, cy - 20, 70);
    ctx.fillText(minutesText, cx, cy + 35, 70);
  },
  drawLine: function drawHand(ctx, cx, cy, angle, length, color) {
    // Find the end points
    var x2 = cx + Math.sin(angle) * length;
    var y2 = cy - Math.cos(angle) * length;
  
    // Configure how we want to draw the hand
    ctx.lineWidth = 8;
    ctx.strokeStyle = color;
  
    // Begin drawing
    ctx.beginPath();
  
    // Move to the center point, then draw the line
    ctx.moveTo(cx, cy);
    ctx.lineTo(x2, y2);
  
    // Stroke the line (output to display)
    ctx.stroke();
  },
  drawCircle: function drawCircle(ctx, cx, cy, radius, lineWidth, color) {
    ctx.fillStyle = color;
    ctx.rockyFillRadial(cx, cy, radius - lineWidth, radius, 0, 2 * Math.PI);
  },
  drawDay: function drawDay(ctx, cx, cy) {
    var day = '';
    switch (new Date().getDay()) {
      case 0:
          day = "SUN";
          break;
      case 1:
          day = "MON";
          break;
      case 2:
          day = "TUE";
          break;
      case 3:
          day = "WED";
          break;
      case 4:
          day = "THU";
          break;
      case 5:
          day = "FRI";
          break;
      case 6:
          day = "SAT";
      }
  
      ctx.fillStyle = 'lightgray';
      ctx.textAlign = 'center';
      ctx.font = '24px bold Gothic';
  
      ctx.fillText(day, cx, cy, 30);
  },
  drawStock: function drawWeather(ctx, stockData, cx, cy) {
    // Create a string describing the weather
    var symbol = stockData.symbol;
    var Ask = 'Ask:' + stockData.Ask;
    var Bid = 'Bid:' + stockData.Bid;
  
    // Draw the text, top center
    ctx.fillStyle = 'lightgray';
    ctx.textAlign = 'center';
    ctx.font = '24px bold Gothic';
    ctx.fillText(symbol, cx, cy, 100);
    ctx.fillText(Ask, cx, cy + 20, 100);
    ctx.fillText(Bid, cx, cy + 40, 100);
  }
};