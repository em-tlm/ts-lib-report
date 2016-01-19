exports.output = function(out, data, options) {
	// options: timestamp, header with page numbers, own html template
	// {timestamp: "on", pageNumbers: "on", type: ("table", "pie", "graph", or 'provide a template, no path')}
	
  var path = require('path');
  var ejs = require('ejs');
  var phantom = require('phantom');
  var fs = require('fs');


	if (options === undefined) options = {}; // if options undefined, default options

  var curpath = path.join(__dirname, 'templates/'); 


	var orightml;
	if ("type" in options) {
		if (options.type === "pie") { orightml = 'usageReportPieTemplate.ejs';}
		else if (options.type === "table") { orightml = 'logsTableTemplate.ejs';}
		else if (options.type === "timeSeries") { orightml ='timeSeriesTemplate.ejs';}
    else if (options.type === "lineGraph") { orightml = 'xyGraphTemplate.ejs';}
 		else orightml = options.type;
 	} else {
 		console.log("ERROR: 'type' undefined");
 		return;
 	}

// generates html from ejs template
function ejs2html(path, information) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) { console.log(err); return false; }
        var ejs_string = data,
            template = ejs.compile(ejs_string),
            html = template(information);
            // saves html file to htmlOutput directory
        fs.writeFile(curpath + 'htmlOutput/' + orightml + '.html', html, function(err) { 
            if(err) { console.log(err); return false }
            return true;
        });  
    });
}

// call ejs2html 
if (options.title === undefined) options.title = "";
ejs2html(curpath+orightml,
  { pagename: options.title,
    raw: JSON.stringify(data)
  });

var htmlRendered = curpath + 'htmlOutput/' + orightml + ".html"; // path to rendered file

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
    page.set('zoomFactor', 1)
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


