var pdf = require('./htmlToPdf.js');
//var arrayPdf = require('./htmlToPdfArray.js');

pdf.output("output/customTest.pdf", 
     'templates/customTemplate.ejs',
     {
     title1: 'Logs Table',
     table:{
          data: [{ Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"}],
          id: 'table'
     },

     title2: 'Usage Pie',
     pie: {
          data: [{label:"Running", data:20},
                 {label:"Idle", data:60},
                 {label:"Stalled", data:20}],
          id: 'pie'
     },

     title3: 'Time Series Data',
     graph:{
          data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                 {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                 {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                 {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                 {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}]],
          xAxisLabel: 'Time',
          yAxisLabel: 'Units',
          id: 'graph'
     }, 

     {pageNumbers: "on", timestamp: "on"});

// pdf.output("output/pie.pdf", 
// 	[{label:"Running", data:20},
//       {label:"Idle", data:60},
//       {label:"Stalled", data:20}], 
//      {title: "Usage Report", type: "pie", pageNumbers: "on", timestamp: "on"});

// pdf.output("merge", 
//      [{xtitle: "date"}, {ytitle: "value"}, // axis lables for graphs, use "" for blank
//       [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
//       {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
//       {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
//       {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
//       {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}]], 
//      {title: "Time v Value", type: "timeSeries", pageNumbers: "on", timestamp: "on"});


// pdf.output("merge", 
// 	[{xtitle: "THIS IS X"},{ytitle: "THIS IS Y"},
//       [{x:1, y:3}, // axis lables for graphs, use "" for blank
//       {x:2, y:8},
//       {x:3, y:5},
//       {x:4, y:13},
//       {x:5, y:4}]], 
//      {title: "X-Y", type: "lineGraph", pageNumbers: "on", timestamp: "on"});
 
// pdf.output("merge", 
// [{ Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //      { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ], 
//      {title: "Event Log", type: "table", pageNumbers: "on", timestamp: "on"});

// setTimeout(function () { pdf.concat("output/report.pdf"); }, 3000);