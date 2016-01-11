// call exports.output(generateHTML(type, data), output));

// exports.generateHTML = function(type, data) { // type = pie chart, table, plotted graph
//  	if (type === "pie") { html = 'http://localhost:5555/usageReportPie.html'}
// 	else if (type === "table") { html = 'http://localhost:5555/logsTable.html'}
// 	else if (type === "graph") { html = 'http://localhost:5555/timeSeriesDataPlot.html'}
//  	else { html = "ERROR" }
// };

exports.output = function(out, type, data, options) {

	// options: timestamp, header with page numbers, own html template
	// {timestamp: provide new date object, pageNumbers: "on", provideHTMLTemplate: "path/to/template"}
	if (options === undefined) options = {};
	if ("timestamp" in options || "pageNumbers" in options) {
	var headerObj = {header:{}};
	headerObj.header.height = "1.2 cm";
	headerObj.header.contents = "<h1>Header <span style='float:right'>";
	if ("pageNumbers" in options) {
		headerObj.header.contents = headerObj.header.contents + 
		phantom.callback(function(pageNum, numPages) {
    		return pageNum + " / " + numPages;
  		});
	}
	if ("timestamp" in options) {
		headerObj.header.contents = options.timestamp;
	}
	headerObj.header.contents = headerObj.header.contents + "</span></h1>";
	}

	var html;
	if ("provideHTMLTemplate" in options) { 
		html = options.provideHTMLTemplate;
	} else {
		if (type === "pie") { html = 'file:///Users/emeryotopalik/ts-report-/public/usageReportPie.html'; }
		else if (type === "table") { html = 'file:///Users/emeryotopalik/ts-report-/public/logsTable.html'; }
		else if (type === "graph") { html = 'file:///Users/emeryotopalik/ts-report-/public/timeSeriesDataPlot.html'; }
 		else { html = "ERROR"; }
 	}

var phantom = require('phantom');
  phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };
	if (headerObj != undefined) {
		page.set('paperSize', {format: 'Letter', 
		orientation: 'portrait', margin:'1cm', header: headerObj.header});
	} else {
		page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
	}
    page.set('zoomFactor', 1);
    page.open(html, function(status) {
      console.log(status);
        page.render(out,function(){
        console.log('Page Rendered');
        ph.exit();
      });
    });
  });
});
};

