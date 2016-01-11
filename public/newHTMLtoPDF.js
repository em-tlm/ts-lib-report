// call exports.output(generateHTML(type, data), output));

exports.generateHTML = function(type, data) { // type = pie chart, table, plotted graph
 	if (type === "pie") { html = 'http://localhost:5555/usageReportPie.html'}
	else if (type === "table") { html = 'http://localhost:5555/logsTable.html'}
	else if (type === "graph") { html = 'http://localhost:5555/timeSeriesDataPlot.html'}
 	else { html = "ERROR" }
};

exports.output = function(output, type, data) {
var html;
	if (type === "pie") { html = 'http://localhost:5555/usageReportPie.html'}
	else if (type === "table") { html = 'http://localhost:5555/logsTable.html'}
	else if (type === "graph") { html = 'http://localhost:5555/timeSeriesDataPlot.html'}
 	else { html = "ERROR" }


var phantom = require('phantom');
//var html = 'http://localhost:5555/generation.html'; // input
//var file = 'public/output/plots.pdf'; // output


  phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };   
    page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
    page.set('zoomFactor', 1);

    page.open(html, function(status) {
      console.log(status);
    
        page.render(output,function(){
        console.log('Page Rendered');
        ph.exit();
      });
    });
  });
});
  return output;
};
