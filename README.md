# pdf-module

1. Install nodejs and npm

2. Cd into directory, and enter commands:

    npm install

3. To Generate a PDF from HTML
    
    var pdf = require('./newHTMLtoPDF.js');
    pdf.output("path/to/output/file", data, 
 			{timestamp: "on", pageNumbers: "on", type: "table", "pie", "graph", or 'provide a template'})
  
4. Notes on template:
    - Does not support JQuery
