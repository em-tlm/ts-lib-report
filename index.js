var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var phantom = require('phantom');
var Q = require('q');
var lodash = require('lodash');

exports.createPdf = function(file, options) {
    lodash.defaultsDeep(options, {
        template: null,
        htmlPath: null,
        data: null,
        phantomProperties: {
            paperSize: {
                format: 'Letter',
                orientation: 'portrait',
                margin: '1cm'
            },
            viewportSize: { width: 1920, height: 1920 },
            zoomFactor: 1
        }
    });
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
            return Q.all(lodash.map(options.phantomProperties, function(value, key) {
                return page.property(key, value);
            }));
        }).then(function() {
            return sitepage.setContent(
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
