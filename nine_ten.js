var five = require("johnny-five");
var Edison = require("edison-io");
global.board = new five.Board({
  io: new Edison()
});

var Movement = require("./movement");
var Display = require("./display");
var Camera = require("./camera");
var AWS = require("./awsSQS");

global.board.on("ready", function() {
  Movement.movement();
  Display.display("I Love DesertHeart");
  //console.log("Take Picture");
  //Camera.takePicture();
  //console.log("Picture taken");
  //var interval = setInterval(function() {
    //AWS.getMessage();
    console.log("aws called");
  //}, 1000);
});
