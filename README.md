# pdf-module

1. Install nodejs and npm

2. To Generate a PDF from HTML
    
        var pdf = require('./newHTMLtoPDF.js');
        
        var data = [
        {type: "name of template stored in 'templates/'",
        title: "templateTitle", 
        data: [1,2] } 

        //... next object...
        ]
        
    	pdf.output("path/to/output/file", data, {
            title: "title", //default blank
            timestamp: true, //default false
            pageNumbers: true, //default false
            });
        
    * see test.js for further data entry examples as they are different for each template
  
4. Notes on templates:
    - EJS does not recognize JQuery calls.
    - Store your template in the template folder.
    - Unparsed data must be defined in template as: 
    
            JSON.parse(<%- JSON.stringify(raw)%>)
    
    - Parse the data in the EJS template.

    * see .ejs files in public/templates for examples
