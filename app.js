var express = require('express');
var app = express();
var path = require('path');

var toPdf = require(path.join(__dirname, 'public/newHTMLtoPDF.js'));

console.log('Server is up');

app.use(express.static('public'));

app.get('/createPDF', function(req, res) {
	//res.send(toPdf.output());

	res.download(toPdf.output('public/output/table.pdf', "table", 3));
});

app.listen(process.env.PORT || 5555);
