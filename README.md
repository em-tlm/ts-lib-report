# pdf-module

- Install nodejs and npm

- Install [pdftk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)

  - Mac
  ```bash
  port install pdftk
  ```

  - Debian, Ubuntu
  ```bash
  apt-get install pdftk
  ``

  - RPM

  https://www.pdflabs.com/docs/install-pdftk-on-redhat-or-centos/

- Cd into directory, and download modules by entering:

```bash
npm install
```

- To Generate a PDF from HTML

  - see test.js for data entry examples

```javascript
var pdf = require('./htmlToPdf.js');

pdf.output("path/to/output/file" or "merge", data, {
    title: "title",
    timestamp: "on",
    pageNumbers: "on",
    type: "table", "pie", "graph", or "provide/name/of/template"
});
```
  
- Notes on templates:
  - Does not support JQuery
  - Store your template in template folder
  - Data must be defined in template as:
  ```javascript
  JSON.parse(<%- JSON.stringify(raw)%>)
  ```
  - see .ejs files in public/templates for examples
