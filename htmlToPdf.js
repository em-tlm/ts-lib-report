var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var Q = require('q'); 
var prompt = require('prompt-sync');
var curpath = path.join(__dirname, 'templates/'); 

//Exports for unit tests
module.exports = {
  ejs2html: ejs2html,
  appendTitle: appendTitle,
  appendBody: appendBody,
  createPDF: createPDF,
  promptUser: promptUser,
  checkIfExists: checkIfExists,
  output: output
};

// renders html file by appending ejs templates to templateFile
function ejs2html(path, information, templateFile) {
  var data = fs.readFileSync(path, 'utf8');
  Q.when(data, function () { 
    var ejs_string = data,
        template = ejs.compile(ejs_string),
        html = template(information);
        // saves html file to htmlOutput directory
    var appended = fs.appendFileSync(curpath + templateFile, html + "<br>");  
    Q.when(appended, function () {
      return "appended";
    });
  });
};

// called only when title option present
function appendTitle(path, name, outputFile) { 
  ejs2html(curpath + path, {title: name}, outputFile);
}; 

function appendBody(data, outputFile) {
  for (var i = 0; i < data.length; i++) {
  var orightml;
  if ("type" in data[i]) {
    if (data[i].type === "pie") { orightml = 'usageReportPieTemplate.ejs';}
    else if (data[i].type === "table") { orightml = 'logsTableTemplate.ejs';}
    else if (data[i].type === "timeSeries") { orightml ='timeSeriesTemplate.ejs';}
    else if (data[i].type === "lineGraph") { orightml = 'xyGraphTemplate.ejs';}
    else orightml = data[i].type;
  } else {
    console.log("ERROR: 'type' undefined");
    return;
  }
    ejs2html(curpath+orightml, { raw: data[i] }, outputFile); 
  }
}; 

// uses phantom module for node to render PDF from the template file rendered by EJS
function createPDF(htmlToRender, output, pageNumbers, timeStamp,cb) {

  phantom.create(function(ph){
    ph.createPage(function(page) {
      page.viewportSize = { width: 1920, height: 1920 };

        if (pageNumbers) {
          var headerObj = 
          { header: { height: '1cm',
            contents: ph.callback(function(pageNum, numPages) {
              return "<h1><font size='1'><span style='float:right'>" + pageNum + "</span></h1>";
            })
          }}
        }
        if (timeStamp) {
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
    
      if (pageNumbers || timeStamp) { 
        page.set('paperSize', {format: 'Letter', 
        orientation: 'portrait', margin:'1cm', header: headerObj.header});
      } else {
        page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
      }

      page.set('zoomFactor', 1)
      page.open(htmlToRender, function(status) {
        if (status === "success") {
          console.log("Page Opened");
          page.render(output,function(){
            console.log('Page Rendered');
            cb("Success");
            ph.exit();
          });
        } else {
         // console.log("ERROR: Not a valid template");
          cb(new Error("ERROR: Not a valid template"));
        }
      });
    });
  });
};

// makes sure to not overwrite existing PDFs without permission
function promptUser(out) {
  console.log('The file \"' + out + '\" already exists. Proceed and overwrite? (y/n)');
  var result = prompt();
  return result;
};

// if template file of name already exists, will append tail to it...
// debatedly could handle the same way as the PDF?
function checkIfExists(file) {
  var count = 1;
  var temp = file;
    while (fs.existsSync(curpath + temp)) {
      temp = file;
      temp = temp.substring(0, temp.length - 5);
      temp = temp + "(" + count + ").html";
      count++;
  }
  return temp;
};

// function called by user
// Will first render HTML from data and then render PDF from HTML.
function output(out, data, options) {

  if (fs.existsSync(out)) { // check if PDF output file already exists
    var proceed = promptUser(out);
  } else {
   var proceed = "y";
  }

  if (proceed === "y" || proceed === "Y") {

    // deal with defaults
    if (options.pageNumbers === undefined) options.pageNumbers = false;
    if (options.timestamp === undefined) options.timestamp = false;
    if (options.template === undefined) options.template = "htmlOutput/template.html";
    
    var file = checkIfExists(options.template); // makes sure not to overwrite existing HTML
    var htmlRendered = curpath + file; // path to final HTML file for phantom
    if (options.title != undefined) appendTitle("title.ejs", options.title, file); // renders HTML for title
    appendBody(data, file); // renders HTML for body, ie all data entries
    createPDF(htmlRendered, out, options.pageNumbers, options.timestamp); // renders PDF from HTML
  
  } else { // didn't want to overwrite existing PDF
    console.log("No HTML or PDF Rendered"); 
  }
};
