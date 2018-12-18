var express = require('express');
var router = express.Router();
const fs = require('fs');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var htm = "";
  htm =  htm + "<p>" + "URL Path Requested: " + req.originalUrl + "</p>";
  htm =  htm + "<p>" + "IP Address of Requestor: " + req.ip + "</p>";
  htm =  htm + "<p>" + "Host Name: " + req.hostname + "</p>";
  htm =  htm + "<p>" + "body: " + JSON.stringify(req.body)+ "</p>";
  htm =  htm + "<p>" + "Header: " + JSON.stringify(req.headers)+ "</p>";

  var myfilename = '/whowhat-logs/requestLog-'+moment()+'.txt';

  fs.writeFile(myfilename, htm, function (err) {
      if (err) throw err;
        //console.log('Saved!');
  });

  res.send(htm);
});

module.exports = router;
