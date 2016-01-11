var express = require('express');
var app = express();
var path = require('path');

//var toPdf = require('./public/htmlToPdf')
var toPdf = require(path.join(__dirname, 'public/htmlToPdf.js'));
console.log('Server is up');

app.use(express.static('public'));

app.get('/createPDF', function(req, res) {
	//res.send(pdf);
	res.download(toPdf.output());
});

app.listen(process.env.PORT || 5555);
