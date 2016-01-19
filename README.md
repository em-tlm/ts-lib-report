# pdf-module

1. Install nodejs and npm

2. Cd into directory, and download modules by entering:

    npm install

3. To Generate a PDF from HTML
    
        var pdf = require('./newHTMLtoPDF.js');

    	pdf.output("path/to/output/file" or "merge", data, {
            title: "title",
            timestamp: "on", 
            pageNumbers: "on", 
            type: "table", "pie", "graph", or "provide/name/of/template"
            });
        
    * see test.js for data entry examples
  
4. Notes on templates:
    - Does not support JQuery
    - Store your template in template folder
    - Data must be defined in template as: 
    
            JSON.parse(<%- JSON.stringify(raw)%>)

    * see .ejs files in public/templates for examples
