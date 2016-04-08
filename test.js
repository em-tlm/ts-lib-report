
var path = require('path');
var tsReport = require('./index.js');

tsReport.createPdf('output/demo.pdf', {
    template: 'demo/demo.ejs',
    data: {val: 'hello'},
    htmlPath: 'output/demo.html',
    outputHtml: true
});
