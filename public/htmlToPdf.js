var path = require('path');
var ejs = require('ejs');
var phantom = require('phantom');
var fs = require('fs');
var prompt = require('prompt-sync');

// @input outFile string name of output file
// @input template ejs template file specified by user
// @input inputData ejs input data matching template specified by user. if not all fields match, give warning message in console.
// @input pageOptions optional toggle for timestamp, header, and pg #'s
// @output PDF named outFile rendered by html generated from template

module.exports = {
  output: output,
  ejs2html: ejs2html,
  promptUser: promptUser
};

function ejs2html(path, information, htmlRendered, cb) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) { 
      cb(new Error(err));
      return false; 
    }
    var ejs_string = data,
        template = ejs.compile(ejs_string),
        html = template(information);
    // saves html file to htmlOutput directory
    fs.writeFile(htmlRendered, html, function(err) { 
      if(err) { 
        cb(new Error(err));
        return false 
      }
      cb("HTML Rendered");
      return true;
    });  
  });
};

function createPDF(outFile, htmlRendered, pageOptions, cb) {
  
  // deal with default options
  if (pageOptions.timestamp === undefined) pageOptions.timestamp = false;
  if (pageOptions.pageNumbers === undefined) pageOptions.pageNumbers = false;

  phantom.create(function(ph){
    ph.createPage(function(page) {
      page.viewportSize 

      if (pageOptions.pageNumbers) {
      var headerObj = 
        { header: { height: '1cm',
              contents: ph.callback(function(pageNum, numPages) {
                return "<h1><font size='1'><span style='float:right'>" + pageNum + "</span></h1>";
        })
        }}
      }

      if (pageOptions.timestamp) {
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

      if (pageOptions.pageNumbers || pageOptions.timestamp) { 
        page.set('paperSize', {format: 'Letter', 
        orientation: 'portrait', margin:'1cm', header: headerObj.header});
      } else {
        page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
      }

      page.set('zoomFactor', 1)
      page.open(htmlRendered, function(status) {
        if (status === "success") {
          page.render(outFile,function(){
            cb("PDF Rendered");
            ph.exit();
          });
        } else {
          cb(new Error("Not a valid template"));
        }
      });
    });
  });
};

function promptUser(file) {

  if (fs.existsSync(file)) { // check if PDF output file already exists
  console.log('The file \"' + file + '\" already exists. Do you want to overwrite it? (y/n)');
  var result = prompt();
  } else {
   var result = "y";
  }
  return result;
};

function output(outFile, template, inputData, pageOptions, cb) {

  var proceed = promptUser(outFile);

  if (proceed === "y" || proceed === "Y") {

    var curpath = path.join(__dirname, 'templates/'); 
    var htmlRendered = curpath + 'htmlOutput/' + template + ".html"; // path to rendered file
    
    ejs2html(curpath+template, inputData, htmlRendered, cb); //render HTML
    createPDF(outFile, htmlRendered, pageOptions, cb); // render PDF
  } else {
    cb("Not rendering PDF");
  }
};

