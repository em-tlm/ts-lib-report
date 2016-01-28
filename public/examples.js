// examples.js
var pdf = require('./htmlToPdf.js');

 // EXAMPLE 1: using customTemplate.ejs with pie, graph, and table, with all parameters chosen
 //            logs table is long enough to span multiple pages, and phantom handles page breaks for that
 //            page breaking also does not separate div elements that wrap chart title with chart 
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
              },
        graph:{
              id: "graph",
              title: "Time Series Data",
              width: 500,
              height: 275,
              data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                     {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                     {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                     {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                     {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}],
              yAxisLabel: "Units"
              },
        table:{
              id: "table",
              title: "Events Log Table",
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
                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]
      }
      }, 
      { pageNumbers: "on", timestamp: "on" }, 
      function (err) { if (err) console.error(err); });

 // EXAMPLE 2: using customTemplate.ejs with pie, graph, and table, with fewer and different parameters chosen
 // TODO: try taking titles out, or try not specifying the width
 // (also maybe try predetermining width on ejs template, and/or using percentage instead of px)
 pdf.output("output/example2.pdf", 
      "/customTemplate.ejs",
      { pie: {
              id: "pie",
              title: "Usage Pie",
              width: 500,
              height: 275,
              data: [{label:"Running", data:20},
                     {label:"Idle", data:60},
                     {label:"Stalled", data:20}],
              },
        graph:{
              id: "graph",
              title: "Time Series Data",
              width: 500,
              height: 275,
              data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                     {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                     {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                     {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                     {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}],
              yAxisLabel: "Units"
              },
        table:{
              id: "table",
              title: "Events Log Table",
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
                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]
      }
      }, 
      { pageNumbers: "on", timestamp: "on" }, 
      function (err) { if (err) console.error(err); });

 // EXAMPLE 3: using piesTemplate.ejs to show how to use multiple pies in one page
 pdf.output("output/example3.pdf", 
      "/customTemplate.ejs",
      { pie: {
              id: "pie",
              title: "Usage Pie",
              width: 500,
              height: 275,
              data: [{label:"Running", data:20},
                     {label:"Idle", data:60},
                     {label:"Stalled", data:20}],
              },
        graph:{
              id: "graph",
              title: "Time Series Data",
              width: 500,
              height: 275,
              data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                     {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                     {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                     {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                     {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}],
              yAxisLabel: "Units"
              },
        table:{
              id: "table",
              title: "Events Log Table",
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
                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]
      }
      }, 
      { pageNumbers: "on", timestamp: "on" }, 
      function (err) { if (err) console.error(err); });


 // EXAMPLE 4: VARIOUS GRAPH THINGS
 //            multiseries line graph
 //            different time formats
 //            different number of ticks
 //            grid or no grid
 pdf.output("output/example4.pdf", 
      "/customTemplate.ejs",
      { pie: {
              id: "pie",
              title: "Usage Pie",
              width: 500,
              height: 275,
              data: [{label:"Running", data:20},
                     {label:"Idle", data:60},
                     {label:"Stalled", data:20}],
              },
        graph:{
              id: "graph",
              title: "Time Series Data",
              width: 500,
              height: 275,
              data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                     {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                     {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                     {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                     {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}],
              yAxisLabel: "Units"
              },
        table:{
              id: "table",
              title: "Events Log Table",
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
                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]
      }
      }, 
      { pageNumbers: "on", timestamp: "on" }, 
      function (err) { if (err) console.error(err); });
