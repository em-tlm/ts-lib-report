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
        waitBeforeRendering: 0,
        dimension: {
            dpi: 96.0,
            orientation: 'portrait',
            marginInInch: 0.4
        }
    };
    lodash.defaultsDeep(options, defaultOptions);
    var dim = calDimension(options.dimension);
    var phantomOpts = {
        viewportSize: { width: dim.width, height: dim.height },
        paperSize: {
            width: dim.width + 'px',
            height: dim.height + 'px',
            margin: dim.margin + 'px'
        },
        zoomFactor: 1
    };
    var template = path.resolve(options.template);
    var html_path = options.htmlPath && path.resolve(options.htmlPath) ||
            template.replace(/\.ejs$/i, '.html');
    var sitepage, phInstance, content;
    return ejs2html(template, lodash.extend(options.data, {_dim: dim}))
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
            return Q.all(lodash.map(phantomOpts, function(value, key) {
                return page.property(key, value);
            }));
        }).then(function() {
            return sitepage.setContent(
                content, 'file://' + html_path);
        })
        .then(function() {
            return Q.delay(options.waitBeforeRendering);
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

var calDimension = function(dimension) {
    var widthInch = 8.5, heightInch = 11;
    var width = Math.round(widthInch * dimension.dpi);
    var height = Math.round(heightInch * dimension.dpi);
    var margin = Math.round(dimension.marginInInch * dimension.dpi);
    var temp;
    if (dimension.orientation === 'landscape') {
        temp = width; width = height; height = temp;
    }
    return { width: width, height: height, margin: margin };
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
