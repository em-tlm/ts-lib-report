var phantom = require('phantom');
var html = 'http://localhost:5555/jank.html';
var file = 'output/jank.pdf';


phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };   
    page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
    page.set('zoomFactor', 1);

    page.open(html, function(status) {
      console.log(status);
    
      page.render(file,function(){
        console.log('Page Rendered');
        ph.exit();
      });
    });
  });
});


// MAKE MULTIPLE PAGES INTO PDFs
// var urls = ["http://localhost:5555/table.html", "http://localhost:5555/charts.html"];
// var files = ["output/table.pdf", "output/charts.pdf"];

// phantom.create(function(ph){
// ph.createPage(function(page) {
//   page.viewportSize = { width: 1920, height: 1920 };   
//   page.set('paperSize', {format: 'Letter', orientation: 'portrait'});
//   page.set('zoomFactor', 1);
//   function render(urls, files, callback) {
//     if (urls.length == 0) {
//       console.log("Exiting...");
//       ph.exit();
//       if (callback) callback();
//         return;
//     }
//     var url = urls[0];
//     var file = files[0];
//     page.open(url, function(){
//       page.render(file);
//       render(urls.slice(1), files.slice(1), callback);

//     });
//     }
//     render(urls, files);
//   });
// });



/*var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('logsTable.html', 'utf8');
//var html = "<h1>HI<\h1>";
var options = {  type: 'png', orientation: 'portrait', format: 'letter' };

pdf.create(html, options).toFile('test.png', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});*/

/*
var pdfMake = require('pdfmake');
var docDefinition = {content: 'THIS IS CONTENT'};
pdfMake.createPdf(docDefinition).open();*/