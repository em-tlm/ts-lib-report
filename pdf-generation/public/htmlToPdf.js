var phantom = require('phantom');
var html = 'http://localhost:5555/index.html';
var file = 'output/test.pdf';



phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };   
    page.set('paperSize', {format: 'Letter', orientation: 'portrait'});
    page.set('zoomFactor', 1);
    //page.clipRect = { left: 0, top: 0, width: 10, height: 10 };

    page.open(html, function(status) {
      console.log(status);
      // var clipRect = page.evaluate(function () { 
      //   return document.getElementById('charts').getBoundingClientRect(); 
      // });

      // page.clipRect = {
      //   top:    clipRect.top,
      //   left:   clipRect.left,
      //   width:  clipRect.width,
      //   height: clipRect.height
      // };

      page.render(file,function(){
        console.log('Page Rendered');
        ph.exit();
      });
    });
  });
});


// //MAKE MULTIPLE PAGES INTO PDFs
// var urls = ["file:///Users/wendywei/Documents/pdf/public/charts.html", "file:///Users/wendywei/Documents/pdf/public/table.html"];

// phantom.create(function(ph){
// ph.createPage(function(page) {
//   page.viewportSize = { width: 1920, height: 1920 };   
//   page.set('paperSize', {format: 'Letter', orientation: 'portrait'});
//   page.set('zoomFactor', 1);
//   function render(urls, callback) {
//     if (urls.length == 0) {
//       console.log("Exiting...");
//       ph.exit();
//       if (callback) callback();
//         return;
//     }
//     var url = urls[0];
//     page.open(url, function(){
//       page.render('screen_'+url.replace(/[\/:]/g, "_")+'.pdf');
//       render(urls.slice(1), callback);
//     });
//     }
//     render(urls);
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