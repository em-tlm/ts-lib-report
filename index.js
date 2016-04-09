var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var phantom = require('phantom');
var Q = require('q');
var lodash = require('lodash');

exports.createPdf = function(file, options) {
    var defaultOptions = {
        template: null,
        htmlPath: null,
        data: null,
        outputHtml: false,
        phantomProperties: {
            // viewportSize: { width: 1920, height: 1920 },
            paperSize: {
                format: 'Letter',
                orientation: 'portrait',
                margin: '1cm'
            },
            zoomFactor: 1
        }
    };
    lodash.defaultsDeep(options, defaultOptions);
    var template = path.resolve(options.template);
    var html_path = options.htmlPath && path.resolve(options.htmlPath) ||
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
        }).then(function() {
            return file;
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
