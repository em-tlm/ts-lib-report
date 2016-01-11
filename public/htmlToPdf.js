exports.output = function() {

var phantom = require('phantom');
var html = 'http://localhost:5555/generation.html';
var file = 'public/output/plots.pdf';


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
  return file;
};
