var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var PDFMerge = require('pdf-merge');
var ejs = require('ejs');
var phantom = require('phantom');
var os = require('os');

var PDFs = [];

var phantomPath = path.join(
    __dirname, '../phantomjs-bin',
    os.platform() === 'darwin' ?
        'phantomjs-1.9.8-macosx' : 'phantomjs-1.9.8-linux-x86_64',
    'phantomjs');

exports.concat = function(output) {
    // how to deal with page numbers?
    var pdfMerge = new PDFMerge(PDFs, output);

    pdfMerge.merge(function(error, result) {
        if (error != null) console.log(error);
        else fs.writeFile(output, result);
    });

    setTimeout(function () {
        for (var i = 0; i < PDFs.length; i++) {
            var child = exec('rm ./' + PDFs[i], function(err) {
                if (err) console.log(err);
            });
        }}, 1000);

};

exports.output = function(out, data, options) {
    // options: timestamp, header with page numbers, own html template
    // {timestamp: "on", pageNumbers: "on", type: ("table", "pie", "graph", or 'provide a template, no path')}

    if (out === "merge") {
        out = "output/" + PDFs.length + ".pdf";
        PDFs.push(out);
    }

    // if options undefined, default options
    if (options === undefined) { options = {}; }
    var curpath = path.join(__dirname, 'templates/');
    var orightml;
    if ("type" in options) {
        if (options.type === "pie") {
            orightml = 'usageReportPieTemplate.ejs';
        } else if (options.type === "table") {
            orightml = 'logsTableTemplate.ejs';
        } else if (options.type === "timeSeries") {
            orightml ='timeSeriesTemplate.ejs';
        } else if (options.type === "lineGraph") {
            orightml = 'xyGraphTemplate.ejs';
        } else {
            orightml = options.type;
        }
    } else {
        if (options.fail) {
            options.fail("Error: 'type' undefined");
        }
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
            fs.writeFile(
                curpath + 'htmlOutput/' + orightml + '.html',
                html, function(err) {
                    if(err) { console.log(err); return false; }
                    return true;
                });
        });
    }

    // call ejs2html to generate PDF
    if (options.title === undefined) options.title = "";
    ejs2html(curpath+orightml, {
        pagename: options.title,
        raw: JSON.stringify(data)
    });

    // path to rendered file
    var htmlRendered = curpath + 'htmlOutput/' + orightml + ".html";

    phantom.create({binary: phantomPath}, function(ph){
        ph.createPage(function(page) {
            var headerObj;
            page.viewportSize = { width: 1920, height: 1920 };
            if (options.pageNumbers === "on") {
                headerObj = {
                    header: {
                        height: '1cm',
                        contents: ph.callback(function(pageNum, numPages) {
                            return "<h1><font size='1'>" +
                                "<span style='float:right'>"
                                + pageNum + "</span></h1>";
                        })
                    }
                };
            }
            if (options.timestamp === "on") {
                if (headerObj === undefined) {
                    headerObj = {
                        header: {
                            height: '1cm',
                            contents: ph.callback(function() {
                                return "<h1><font size='1'>" +
                                    "<span style='float:left'>"
                                    + new Date() + "</span></h1>";
                            })
                        }
                    };
                } else {
                    headerObj.header.contents =
                        ph.callback(function(pageNum, numPages) {
                            return "<h1><font size='1'>" +
                                "<span style='float:right'>" +
                                pageNum + "</span>" +
                                "<span style='float:left'>"
                                + new Date() + "</span></h1>";
                        });
                }
            }
            if (options.pageNumbers === "on" ||
                options.timestamp === "on") {
                page.set('paperSize', {
                    format: 'Letter', orientation: 'portrait',
                    margin:'1cm', header: headerObj.header
                });
            } else {
                page.set('paperSize', {
                    format: 'Letter', orientation: 'portrait',
                    margin:'1cm'
                });
            }
            page.set('zoomFactor', 1);
            page.open(htmlRendered, function(status) {
                if (status === "success") {
                    console.log("Page Opened");
                    page.render(out, function() {
                        if (options.success) {
                            options.success();
                        } else {
                            console.log('Page Rendered');
                        }
                        ph.exit();
                    });
                } else {
                    if (options.fail) {
                        options.fail("ERROR: Not a valid template");
                    } else {
                        console.log("ERROR: Not a valid template");
                    }
                    ph.exit();
                }
            });
        });
    });
};
