//var pdf = require('./newHTMLtoPDF.js');
// call pdf.output("path/to/output/file", data, 
// 			{timestamp: "on", pageNumbers: "on", type: "table", "pie", "graph", or 'provide a template'})


// for array of one chart type: generate an html page with looping of array data and frames of data type
// might not work for tables.... but could do several pie charts and graphs
// could do array of types???

exports.output = function(out, data, options) {
	// options: timestamp, header with page numbers, own html template
	// {timestamp: "on", pageNumbers: "on", type: ("table", "pie", "graph", or 'provide a template')}
	var path = require('path');
  var ejs = require('ejs');
  var phantom = require('phantom');
  var fs = require('fs');


	if (options === undefined) options = {};

  var path = path.join(__dirname, 'templates/');


	var html;
	if ("type" in options) {
		if (options.type === "pie") { html = 'file://' + path + 'usageReportPieTemplate';}
		else if (options.type === "table") { html = 'file://' + path + 'logsTableTemplate';}
		else if (options.type === "graph") { html = 'file://' + path + 'timeSeriesDataPlotTemplate';}
 		else html = options.type;
 	} else {
 		console.log("ERROR: 'type' undefined");
 		return;
 	}

function ejs2html(path, information) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) { console.log(err); return false; }
        var ejs_string = data,
            template = ejs.compile(ejs_string),
            html = template(information);
        fs.writeFile(path + '.html', html, function(err) {
            if(err) { console.log(err); return false }
            return true;
        });  
    });
}



ejs2html(__dirname+"/templates/usageReportPieTemplate.ejs",
  {
  pagename: options.type,
   raw: JSON.stringify(data)
  });

var htmlRendered = __dirname+"/templates/usageReportPieTemplate.ejs.html";


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
    // page.set('content',htmlRender);
    // page.render(out, function() {
    //   console.log('Page Rendered');
    //   ph.exit();
    // });
    page.open(htmlRendered, function(status) {
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


