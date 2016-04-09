var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var phantom = require('phantom');
var Q = require('q');

exports.createPdf = function(file, options) {
    var template = path.resolve(options.template);
    var html_path = path.resolve(options.htmlPath) ||
            template.replace(/\.ejs$/i, '.html');
    var sitepage, phInstance, content;
    return ejs2html(template, options.data)
        .then(function(html) {
            content = html;
            if (options.outputHtml) {
                fs.writeFile(html_path, content, function(err) {
                    if (err) { console.log(err); }
                });
            }
            return phantom.create();
        })
        .then(function(instance) {
            phInstance = instance;
            return instance.createPage();
        })
        .then(function(page) {
            sitepage = page;
            return page.setContent(
                content, 'file://' + html_path);
        })
        .then(function() {
            return sitepage.render(file);
        })
        .fin(function() {
            phInstance.exit();
        });
};

function ejs2html(path, data) {
    var deferred = Q.defer();
    fs.readFile(path, 'utf8', function(err, text) {
        if (err) { deferred.reject(err); }
        var ejs_str = text;
        var html = ejs.render(ejs_str, data);
        deferred.resolve(html);
    });
    return deferred.promise;
}
