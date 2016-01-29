# pdf-module

(More info on Confluence: https://tetrascience.atlassian.net/wiki/display/TSD/Generating+PDF+with+Custom+Templates)

1. Install nodejs and npm

2. To Generate a PDF from HTML 
    
        var pdf = require('./newHTMLtoPDF.js');

        // output call example
        pdf.output("output/example1.pdf", 
                  "/customTemplate.ejs",
                  { pie: {
                          id: "pie",
                          title: "Usage Pie",
                          width: 500,
                          height: 275,
                          data: [{label:"Running", data:20},
                                 {label:"Idle", data:60},
                                 {label:"Stalled", data:20}],
                          }
                  }, 
                  { pageNumbers: "on", timestamp: "on" });
        
    * see examples.js for more output call examples
  
3. See customTemplate.ejs for template example.

4. You can customize elements in chartHelper.js and chartStyle.css or by creating your own helper.js and style.css files.
