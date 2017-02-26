var five = require("johnny-five");
var board = global.board;
var colors = Object.keys(require("css-color-names"));

var Display = {
  display: function (msg) {
    console.log("display");
    var lcd = five.LCD({
      controller: "JHD1313M1"
    });

    lcd.bgColor("red");
    lcd.blink();
    var interval = null;
    var index = 0;

    // Tell the LCD you will use these characters:
    lcd.useChar("check");
    lcd.useChar("heart");
    lcd.useChar("duck");

    // Line 1: Hi rmurphey & hgstrp!
    lcd.clear().print(msg);

    board.wait(1000, function () {
      board.wait(1000, function () {
        Display.clearDisplay(lcd);
        Display.turnOff(lcd);
      });
    });
  },

  clearDisplay: function (lcd) {
    lcd.clear();
    lcd.noBlink();
  },

  turnOff: function (lcd) {
    lcd.bgColor("#000000");
    lcd.off();
  }
};

module.exports = Display;