var path = require('path');
var ejs = require('ejs');
var phantom = require('phantom');
var fs = require('fs');

// @input outFile string name of output file
// @input template ejs template file specified by user
// @input inputData ejs input data matching template specified by user. if not all fields match, give warning message in console.
// @input pageOptions optional toggle for timestamp, header, and pg #'s
// @output PDF named outFile rendered by html generated from template
exports.output = function(outFile, template, inputData, pageOptions) {

var curpath = path.join(__dirname, 'templates/'); 

// call ejs2html (generate html file from template and data)
ejs2html(curpath+template, inputData);

var htmlRendered = curpath + 'htmlOutput/' + template + ".html"; // path to rendered file

phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };

    if (pageOptions.pageNumbers === "on") {
    var headerObj = 
    	{ header: { height: '1cm',
    				contents: ph.callback(function(pageNum, numPages) {
      				return "<h1><font size='1'><span style='float:right'>" + pageNum + "</span></h1>";
   				 })
    	}}
  	}

  	if (pageOptions.timestamp === "on") {
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

  	if (pageOptions.pageNumbers === "on" || pageOptions.timestamp === "on") {	
		  page.set('paperSize', {format: 'Letter', 
		  orientation: 'portrait', margin:'1cm', header: headerObj.header});
	  } else {
		  page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
	  }

    page.set('zoomFactor', 1)
    page.open(htmlRendered, function(status) {
    	if (status === "success") {
    		console.log("Page Opened");
    		page.render(outFile,function(){
        		console.log('Page Rendered');
      		});
    	} else {
      	console.log("ERROR: PDF not rendered.");
      	}
      	ph.exit();
    });
  });
});



// TODO: check that input data fields match template fields????
// function to generate html file from ejs 
function ejs2html(path, information) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) { console.log(err); return false; }
        var ejs_string = data,
            template = ejs.compile(ejs_string),
            html = template(information);
            // saves html file to htmlOutput directory
        fs.writeFile(curpath + 'htmlOutput/' + template + '.html', html, function(err) { 
            if(err) { console.log(err); return false }
            return true;
        });  
    });
}

};


