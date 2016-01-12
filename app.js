var express = require('express');
var app = express();
var path = require('path');

var toPdf = require(path.join(__dirname, 'public/newHTMLtoPDF.js'));

console.log('Server is up');

app.use(express.static('public'));

app.get('/createPDF', function(req, res) {
	//res.send(toPdf.output());

	res.download(toPdf.output('public/output/pie.pdf', "pie", [{label:"Running", data:20},
               {label:"Idle", data:60},
               {label:"Stalled", data:20}]));
});





var phantom = require('phantom'),
    fs = require('fs'),
	  ejs = require('ejs');


// var html = ejs.render('pieTemplate.ejs', {
//     title: 'wow'
// });
app.set('view engine', 'ejs');
//var html = new EJS({url: 'public/pieTemplate.ejs'}).render({pagename:'pie'});

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

ejs2html(__dirname+"/public/templates/pieTemplate.ejs", {
  pagename: 'Pie',
  data: [{label:"Running", data:20},
               {label:"Idle", data:60},
               {label:"Stalled", data:20}]
});



var html = __dirname+"/public/templates/pieTemplate.ejs.html";


// var html = ejs.render('pieTemplate', {
//     pagename: 'Pie'
// });

phantom.create(function(ph){
  ph.createPage(function(page) {
    page.viewportSize = { width: 1920, height: 1920 };   
    page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
    page.set('zoomFactor', 1);

    page.open(html, function(status) {
      console.log(status);
    
        page.render(__dirname+"/public/output/test.pdf",function(){
        console.log('Page Rendered');
        ph.exit();
      });
    });
  });
});

// phantom.create(function(ph){
//   ph.createPage(function(page) {
//     page.viewportSize = { width: 1920, height: 1920 };   
//     page.set('paperSize', {format: 'Letter', orientation: 'portrait', margin:'1cm'});
//     page.set('zoomFactor', 1);

// 	  // page.content = html;
// 	  page.set('content', html);
//     page.render('test.pdf',function(){
//     console.log('Page Rendered');
//     ph.exit();
//   	});
//   });
// });


// page.content = html;
// page.render('test.pdf');


// app.get('/', function (req, res) {
// 	swig.renderFile('public/pieTemplate.html', {
// 		pagename: 'Pie Chart',
// 		data: [{label:"Running", data:20},
// 	           {label:"Idle", data:60},
// 	           {label:"Stalled", data:20}]
// 	}, function(err, output){
// 		if (err) {
// 			throw err;
// 		}
// 		console.log(output);
// 	})
// });

app.listen(process.env.PORT || 5555);
