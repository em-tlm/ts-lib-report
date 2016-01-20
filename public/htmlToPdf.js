var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var Q = require('q'); 
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

exports.output = function(out, data, options) {

  if (options.title === undefined) options.title = "";
    
    var file = options.template;
    if (fs.existsSync(curpath + file)) {
      var child = exec('rm ' + curpath + file, function(err) {
        if (err) console.log(err);
      });
    }
  
  appendTitle("title.ejs", options.title, file);
  appendBody(data, file);
  
  var htmlRendered = curpath + 'htmlOutput/template.html';
  createPDF(htmlRendered, out, options.pageNumbers, options.timestamp);

};
