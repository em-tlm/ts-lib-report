exports.output = function(output, type, data) {
var template;
	if (type === "pie") { template = 'http://localhost:5555/pie'}
	else if (type === "table") { template = 'http://localhost:5555/logsTable.html'}
	else if (type === "graph") { template = 'http://localhost:5555/timeSeriesDataPlot.html'}
 	else { template = "ERROR" }

var phantom = require('phantom'),
    ejs = require('ejs');

var html = ejs.render(template, {
    pagename: 'wow'
});


phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };   
    page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
    page.set('zoomFactor', 1);

    page.set('content', html);
    page.render('test.pdf',function(){
    console.log('Page Rendered');
    ph.exit();
    });
  });
});
  return output;
};
