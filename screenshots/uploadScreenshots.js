var AWS = require('aws-sdk');
var fs = require('fs');
var s3 = new AWS.S3();

var bucketName = 'OrderAtCounterScreenshots';
fs.readdir('./images/', function(err, files) {
  var d = new Date();
  var month = d.getMonth();
  var day = d.getDate();
  var year = d.getFullYear();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  var dateString = month + '-' + day + '-' + year + '-' + hour + '-' + minute + '-' + second;
  files.forEach(function(file) {
    fs.readFile('./images/' + file, function(err, data) {
      if(err) {
        console.log(err);
      }
      else {
        s3.client.putObject({
          Bucket: bucketName,
          Key: dateString + '/' + file,
          Body: data,
          ACL: 'public-read'
        }, function(err, data) {
          if(err) {
            console.log(err);
          }
          else {
            console.log('Uploaded ' + file + '.');
          }
        });
      }
    });
  });
});