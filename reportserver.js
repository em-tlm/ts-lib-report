var express = require('express');
var app = express();
var path = require('path');
var tsReport = require('./index.js');
var port = process.env.TS_WEB_PORT || 80;
var seed = require('./seed.js');
var bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/demo'));
app.use(express.static(path.join(__dirname, 'demo')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/generate_report/utilization', function(req, res){
  tsReport.createPdf('output/utilizationSingle.pdf', {
      template: 'demo/utilizationSingle.ejs',
      data: req.body,
      htmlPath: 'output/utilizationSingle.html',
      outputHtml: true,
      dimension: {
          marginInInch: 0.7,
          dpi: 72
      }
  }).then(function(file) {
      console.log(file);
  }, function(err) {
      console.log(err);
  });
});

app.listen(port, function () {
  console.log('Listening on ' + port);
});
