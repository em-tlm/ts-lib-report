# pdf-module

1. Install nodejs and npm

2. To Generate a PDF from HTML 
    
        var pdf = require('./newHTMLtoPDF.js');

        // output call example
    	pdf.output("path/to/output.pdf", "path/to/template.ejs", { ID: data }, 
            { pageNumbers: true, // default false
              timestamp: true }, // default false
            callback});
        
    * see test.js for more output call examples
  
3. See customTemplate.ejs for template example.

4. You can customize elements in chartHelper.js and chartStyle.css or by creating your own helper.js and style.css files.
