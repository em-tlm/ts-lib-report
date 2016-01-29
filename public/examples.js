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

 // // EXAMPLE 2: using customTemplate.ejs with pie, graph, and table, with fewer and different parameters chosen
 // // TODO: try taking titles out, or try not specifying the width
 // // (also maybe try predetermining width on ejs template, and/or using percentage instead of px)
 // pdf.output("output/example2.pdf", 
 //      "/customTemplate.ejs",
 //      { pie: {
 //              id: "pie",
 //              title: "Usage Pie",
 //              data: [{label:"Running", data:20},
 //                     {label:"Idle", data:60},
 //                     {label:"Stalled", data:20}],
 //              },
 //        graph:{
 //              id: "graph",
 //              title: "Time Series Data",
 //              data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
 //                     {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
 //                     {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
 //                     {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
 //                     {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}],
 //              yAxisLabel: "Units"
 //              },
 //        table:{
 //              id: "table",
 //              title: "Events Log Table",
 //              data: [{ Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                     { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]
 //      }
 //      }, 
 //      { pageNumbers: "on", timestamp: "on" }, 
 //      function (err) { if (err) console.error(err); });

 // EXAMPLE 2: using piesTemplate.ejs to show how to use multiple pies in one page, maybe in grid
 pdf.output("output/example2.pdf", 
      "/pieTemplate.ejs",
      { pie1: {
              id: "pie1",
              title: "Usage Pie 1/01/16",
              width: 200,
              height: 200,
              data: [{label:"Running", data:20},
                     {label:"Idle", data:60},
                     {label:"Stalled", data:20}],
              },
        pie2: {
              id: "pie2",
              title: "Usage Pie 1/02/16",
              width: 200,
              height: 200,
              data: [{label:"Running", data:40},
                     {label:"Idle", data:40},
                     {label:"Stalled", data:20}],
              },
        pie3: {
              id: "pie3",
              title: "Usage Pie 1/03/16",
              width: 200,
              height: 200,
              data: [{label:"Running", data:35},
                     {label:"Idle", data:60},
                     {label:"Stalled", data:5}],
              },
        pie4: {
              id: "pie4",
              title: "Usage Pie 1/04/16",
              width: 200,
              height: 200,
              data: [{label:"Running", data:33},
                     {label:"Idle", data:35},
                     {label:"Stalled", data:32}],
        }
      },
      { pageNumbers: "on", timestamp: "on" }, 
      function (err) { if (err) console.error(err); });


 // EXAMPLE 3: VARIOUS GRAPH THINGS
 //            multiseries line graph
 //            different time formats
 //            different number of ticks
 //            grid or no grid
 //           
 // TODO: make it so that not all points are required for each timestamp (data may come in asynchronously from different devices)

 pdf.output("output/example3.pdf", 
      "/graphTemplate.ejs",
      { graph1:{
              id: "graph1",
              title: "Time Series Data (Day)",
              width: 500,
              height: 275,
              data: [{date:new Date(2000, 1, 1, 5, 00).getTime(), line1:3, line2:6, line3: 5},
                     {date:new Date(2000, 1, 1, 6, 30).getTime(), line1:8, line2:16, line3:2},
                     {date:new Date(2000, 1, 1, 11, 15).getTime(), line1:5, line2:10, line3:20},
                     {date:new Date(2000, 1, 1, 17, 00).getTime(), line1:7, line2: 20, line3:4},
                     {date:new Date(2000, 1, 1, 22, 00).getTime(), line1:13, line2: 26, line3:22},
                     {date:new Date(2000, 1, 2, 5, 00).getTime(), line1:4, line2:8, line3:27}],
              yAxisLabel: "Units"
              },
        graph2:{
              id: "graph2",
              title: "Time Series Data (Month)",
              width: 500,
              height: 275,
              data: [{date:new Date(2000, 3, 1, 5, 00).getTime(), line1:3, line2:6, line3: 5},
                     {date:new Date(2000, 3, 3, 6, 30).getTime(), line1:8, line2:16, line3:2},
                     {date:new Date(2000, 3, 15, 11, 15).getTime(), line1:5, line2:10, line3:20},
                     {date:new Date(2000, 3, 17, 1, 15).getTime(), line1:10, line2:15, line3:5},
                     {date:new Date(2000, 3, 25, 11, 50).getTime(), line1:16, line2:23, line3:20},
                     {date:new Date(2000, 4, 6, 11, 15).getTime(), line1:11, line2:17, line3:13},
                     {date:new Date(2000, 4, 12, 11, 15).getTime(), line1:2, line2:13, line3:8},
                     {date:new Date(2000, 4, 17, 11, 15).getTime(), line1:11, line2:15, line3:13},
                     {date:new Date(2000, 4, 23, 11, 15).getTime(), line1:17, line2:18, line3:9},
                     {date:new Date(2000, 5, 1, 17, 00).getTime(), line1:7, line2: 20, line3:4},
                     {date:new Date(2000, 5, 7, 22, 00).getTime(), line1:13, line2: 26, line3:16},
                     {date:new Date(2000, 5, 8, 4, 00).getTime(), line1:13, line2: 30, line3:21},
                     {date:new Date(2000, 5, 16, 22, 00).getTime(), line1:13, line2: 26, line3:24},
                     {date:new Date(2000, 5, 29, 5, 00).getTime(), line1:4, line2:8, line3:29}],
              yAxisLabel: "Units"
              }
      },
      { pageNumbers: "on", timestamp: "on" }, 
      function (err) { if (err) console.error(err); });


 // try using customTemplate but only inputting one graph
