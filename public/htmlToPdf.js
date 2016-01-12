//var pdf = require('./newHTMLtoPDF.js');
// call pdf.output("path/to/output/file", data, 
// 			{timestamp: "on", pageNumbers: "on", type: "table", "pie", "graph", or 'provide a template'})

exports.output = function(out, data, options) {

	// options: timestamp, header with page numbers, own html template
	// {timestamp: "on", pageNumbers: "on", type: ("table", "pie", "graph", or 'provide a template')}
	var path = require('path');

	if (options === undefined) options = {};

  var path = path.join(__dirname, 'templates/');

	var html;
	if ("type" in options) {
		if (options.type === "pie") { html = 'file://' + path + 'usageReportPie.html'; }
		else if (options.type === "table") { html = 'file://' + path + 'logsTable.html'; }
		else if (options.type === "graph") { html = 'file://' + path + 'timeSeriesDataPlot.html'; }
 		else html = options.type;
 	} else {
 		console.log("ERROR: 'type' undefined");
 		return;
 	}

var phantom = require('phantom');
  phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };

    if (options.pageNumbers === "on") {
    var headerObj = 
    	{ header: { height: '1cm',
    				contents: ph.callback(function(pageNum, numPages) {
      				return "<h1><font size='1'><span style='float:right'>" + pageNum + "</span></h1>";
   				 })
    	}}
  	}
  	if (options.timestamp === "on") {
  		if (headerObj === undefined) {
  			var headerObj = {
  			header: { 
  				height: '1cm',
  				contents: ph.callback(function() {
  					return "<h1><font size='1'><span style='float:left'>" + new Date() + "</span></h1>";
  				})
  			}}
  		} else {
  			headerObj.header.contents = ph.callback(function(pageNum, numPages) {
      				return "<h1><font size='1'><span style='float:right'>" + pageNum + "</span>" + 
      				"<span style='float:left'>" + new Date() + "</span></h1>";
   				 })
  		}
  	}

  	if (options.pageNumbers === "on" || 
  		options.timestamp === "on") {	
		page.set('paperSize', {format: 'Letter', 
		orientation: 'portrait', margin:'1cm', header: headerObj.header});
	} else {
		page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
	}
    page.set('zoomFactor', 1);
    page.open(html, function(status) {
    	if (status === "success") {
    		console.log("Page Opened");
    		page.render(out,function(){
        		console.log('Page Rendered');
      		});
    	} else {
      	console.log("ERROR: Not a valid template");
      	}
      	ph.exit();
    });
  });
});
};

