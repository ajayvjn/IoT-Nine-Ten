var five = require("johnny-five");
var board = global.board;

var isNotActive = true;
var forceStop = false;

var Movement = {
  movement : function(){
    var a = five.Motor({
      controller: "GROVE_I2C_MOTOR_DRIVER",
      pin: "A",
    });

    var b = five.Motor({
      controller: "GROVE_I2C_MOTOR_DRIVER",
      pin: "B",
    });

    Movement.forward(a, b, [127, 127]);
    board.wait(4000, function() {
      Movement.backward(a, b, [127, 127]);
    }.bind(board));
    board.wait(8000, function() {
      Movement.turnRight(a, b, [40, 250]);
    }.bind(board));
    board.wait(12000, function() {
      Movement.turnLeft(a, b, [250, 40]);
    }.bind(board));

    board.wait(16000, function(){
      Movement.exit();
    })

    /*board.wait(3000, function() {
      // Demonstrate motor stop in 2 seconds
      board.wait(3000, function() {

        board.wait(1000, function() {
          process.emit("SIGINT");
        });
      }.bind(board));
    }.bind(board));*/

  },

  forward : function(a, b, speed){
    if(isNotActive && !forceStop){
      isNotActive = false;
      console.log("Forward");
      a.fwd(speed[0]);
      b.fwd(speed[1]);
      Movement.stop(a, b, 3000);
    } else if(forceStop) {
      Movement.stop(a, b, 0);
    }
  },

  backward : function(a, b, speed){
    if(isNotActive && !forceStop){
      isNotActive = false;
      console.log("Backward");
      a.rev(speed[0]);
      b.rev(speed[1]);
      Movement.stop(a, b, 3000);
    } else if(forceStop) {
      Movement.stop(a, b, 0);
    }
  },

  turnRight : function(a, b, speed){
    if(isNotActive && !forceStop){
      isNotActive = false;
      console.log("Turn Right");
      a.fwd(speed[0]);
      b.fwd(speed[1]);
      Movement.stop(a, b, 3000);
    } else if(forceStop) {
      Movement.stop(a, b, 0);
    }
  },

  turnLeft : function(a, b, speed){
    if(isNotActive && !forceStop){
      isNotActive = false;
      console.log("Turn Left");
      a.fwd(speed[0]);
      b.fwd(speed[1]);
      Movement.stop(a, b, 3000);
    } else if(forceStop) {
      Movement.stop(a, b, 0);
    }
  },

  stop : function(a, b, time){
    console.log("STOP");
    board.wait(time, function() {
      a.stop();
      b.stop();
      isNotActive = true;
      forceStop = false;
    });
  },

  exit : function(){
    process.emit("SIGINT");
  }

};

module.exports = Movement;