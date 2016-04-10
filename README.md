# ts-report

ts-report is a module for create pdf from ejs template.

## Installation
```sh
$ npm install tetrascience/ts-report --save
```

## Usage

### Create a ejs template file
```ejs
<!-- demo.ejs -->
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="./demo.css">
    </head>
    <body>
        <img src="./images/css_logo.png">
        <p>
            Letter or US Letter is a paper size commonly used as home
            or office stationery in Canada, the United States of
            America, and Mexico. It measures 8.5 by 11 inches (215.9
            mm x 279.4 mm). US Letter size paper is a standard defined
            by the American National Standards Institute (ANSI), in
            contrast to the A4 paper used in the rest of the world,
            which is defined by the International Organization for
            Standardization (specifically, in ISO 216).
        </p>
        <%= val %>
        <script src="./demo.js"></script>
    </body>
</html>
```

### Put resource files in the same directory as the template

- images/css_logo.png

- demo.css
```css
/* demo.css */
body {
    color: red;
}
```

- demo.js
```javascript
// demo.js
var para = document.createElement("span");
var node = document.createTextNode("world");
para.appendChild(node);
document.querySelector('body').appendChild(para);
```

### Create Pdf

```javascript
var tsReport = require('tsReport');
tsReport.createPdf('demo.pdf', {
    template: 'demo.ejs',
    data: {val: 'hello'},
    outputHtml: true,
}).then(function(file) {
    console.log(file);
});
```

### More examples
See test.js and demo folder.

## API

### `createPdf(file, options)`

**file**

File path of the output pdf. The filename must end with `.pdf`.

**options**

  - template (required)

  Path of the ejs template.

  - data (required)

  Object passed to the ejs template.

  - outputHtml (optional)

  An html file will be created if this is ture.

  - htmlPath (optional)

  Path of the html file. This is also the start point of all resource
  files, and all these files are relative to this path.

  - dimension

  default:
  ```javascript
  dimension: {
      dpi: 96.0,
      orientation: 'portrait',
      marginInInch: 0.4
  }
  ```
    - orientation: 'portrait' or 'landscape'

  - waitBeforeRendering (optional)

  Milliseconds waited before rendering. If some images are not loaded,
  like CssTemplate example, please try this option.

## Known Issues

### No error message if rendering fails

The callback of the render function does not work. One possible method
would be checking if the output file exists.

### PDF rendering too large

This is a bug of phantomjs (see
[here](https://github.com/ariya/phantomjs/issues/12685)). It has been
fixed but not merged into master. We have to wait for the new version
of [phantomjs](https://github.com/ariya/phantomjs) and
[phantomjs-prebuilt](https://github.com/Medium/phantomjs).

### Images are not loading for some pages

There is an open bug of phantomjs-node (see
[here](https://github.com/amir20/phantomjs-node/issues/396)). Before
that is fixed, please use waitBeforeRendering.
