var pdf = require('./htmlToPdf.js');

pdf.output("output/customTest.pdf", 
     "/customTemplate.ejs",
     {
     pie: {
          id: 'pie',
          title: 'Usage Pie',
          data: JSON.stringify([{label:"Running", data:20},
                 {label:"Idle", data:60},
                 {label:"Stalled", data:20}]),
     },

     graph:{
          id: 'graph',
          title: 'Time Series Data',
          data: JSON.stringify([{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                 {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                 {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                 {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                 {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}]),
          xAxisLabel: 'Time',
          yAxisLabel: 'Units'
     }
     },

     {pageNumbers: "on", timestamp: "on"});
