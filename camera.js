var five = require("johnny-five");
var board = global.board;
var email = require("emailjs");


var Camera = {
  takePicture: function () {
    Camera.run_cmd("rm", ['-f', '/home/root/emergency_image.jpg'], function (text) { console.log(text) });
    console.log("deleted");
    Camera.run_cmd("/home/root/ffmpeg-3.2.4-32bit-static/ffmpeg", ['-s', '1280x720', '-f', 'video4linux2', '-i', '/dev/video0', '-vframes', '1', 'emergency_image.jpg'], function (text) { console.log(text) });
    console.log("taken");
    Camera.sendMail();
  },

  sendMail: function () {

    var emailServer = email.server.connect({
      user: "deserthack910@gmail.com",
      password: "xyz654321",
      host: "smtp.gmail.com",
      ssl: true
    });

    emailServer.send({
      from: "deserthack910@gmail.com",
      to: "deserthack910@gmail.com",
      subject: "Emergency!!!",
      attachment:
      [
        { data: "An emergency has been detected by 910! Check the picture attached to see if it is serious. Please call 911 for help.", alternative: true },
        { path: "/home/root/emergency_image.jpg", type: "image/jpeg", name: "emergency_image.jpg" }
      ]
    }, function (err, message) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(message);
      }
    })
  },

  run_cmd: function (cmd, args, callBack) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function () { callBack(resp) });
  }
};

module.exports = Camera;