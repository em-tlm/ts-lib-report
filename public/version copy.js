"use strict";
var phantom = require('phantom');
console.log('using PhantomJS version ' +
  phantom.version.major + '.' +
  phantom.version.minor + '.' +
  phantom.version.patch);
phantom.exit();