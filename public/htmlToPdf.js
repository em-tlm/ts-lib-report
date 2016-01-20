var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var Q = require('q'); 
var prompt = require('prompt-sync');
var exec = require('child_process').exec;
var curpath = path.join(__dirname, 'templates/'); 

function ejs2html(path, information, templateFile) {
    var data = fs.readFileSync(path, 'utf8');
    Q.when(data, function () { 
      var ejs_string = data,
          template = ejs.compile(ejs_string),
          html = template(information);
          // saves html file to htmlOutput directory
      var appended = fs.appendFileSync(curpath + templateFile, html);  
      Q.when(appended, function () {
        return "appended";
      });
    });
  };

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
      ejs2html(curpath+orightml, { raw: JSON.stringify(data[i]) }, outputFile); 
    }
}; 

function createPDF(htmlToRender, output, pageNumbers, timeStamp) {
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
          });
        } else {
          console.log("ERROR: Not a valid template");
        }
        ph.exit();
      });
    });
  });
};

function promptUser(out) {
  console.log('The file \"' + out + '\" already exists. Proceed and overwrite? (y/n)');
  var result = prompt();
  return result;
};

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

exports.output = function(out, data, options) {

  if (fs.existsSync(out)) {
    var proceed = promptUser(out);
  } else {
   var proceed = "y";
  }

  if (proceed === "y") {

    if (options.title === undefined) options.title = "";
    if (options.pageNumbers === undefined) options.pageNumbers = false;
    if (options.timestamp === undefined) options.timestamp = false;
    if (options.template === undefined) options.template = "htmlOutput/template.html";
    
    var file = checkIfExists(options.template);
    var htmlRendered = curpath + file;
    appendTitle("title.ejs", options.title, file);
    appendBody(data, file);
    createPDF(htmlRendered, out, options.pageNumbers, options.timestamp);
  
  } else {
    console.log("No HTML or PDF Rendered");
  }

};
