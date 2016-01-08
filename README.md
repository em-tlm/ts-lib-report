# pdf-module

To view webpage

1. Install nodejs and npm.

2. Enter commands:

    npm install

    npm start

3. Visit localhost:5555/index.html


To generate pdf

1. Install phantomjs: https://github.com/sgentle/phantomjs-node

2. Enter command:

    node htmlToPdf.js
    
(Note: this generates 2 separate PDFs, charts.pdf and table.pdf, into output folder. The charts.pdf has the visual d3 charts, and the table.pdf has the events log table.)


HTML pages for individual charts

1. Time Series Data: timeSeriesDataPlot2.html

2. Event Log: logsTable.html

3. Usage Report: usageReportPie2.html

  
