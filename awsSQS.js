var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var Display = require("./display");

// Create an SQS service object
var sqs = new AWS.SQS();

var queueURL = "https://sqs.us-east-1.amazonaws.com/666596312501/myLocation";

var params = {
 MaxNumberOfMessages: 1,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 0,
 WaitTimeSeconds: 0
};

var AWS = {

  getMessage: function () {
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else {
        console.log(JSON.stringify(data));
        try{
          if(data !== 'undefined' && data != ""){
            Display.display(data.Messages[0].Body);
            var deleteParams = {
              QueueUrl: queueURL,
              ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            sqs.deleteMessage(deleteParams, function(err, data) {
              if (err) {
                console.log("Delete Error", err);
              } else {
                console.log("Message Deleted", data);
              }
            });
          }
        }catch(e){

        }
      }
    });
  }
};

module.exports = AWS;