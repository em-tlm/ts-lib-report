var pdf = require('./htmlToPdf.js');

pdf.output("output/report.pdf", [
    
      {type: "pie", 
       title: "Usage Report",
       data: [{label:"Running", data:20},
              {label:"Idle", data:60},
              {label:"Stalled", data:20}]},
     
     {type: "lineGraph", 
      title: "XY Graph", 
      xtitle: "THIS IS X", 
      ytitle: "THIS IS Y",
      data: [{x:1, y:3}, // axis lables for graphs, use "" for blank
             {x:2, y:8},
             {x:3, y:5},
             {x:4, y:13},
             {x:5, y:4}]},

     {type: "timeSeries", 
      title: "Time Series", 
      xtitle: "date", 
      ytitle: "value", // axis lables for graphs, use "" for blank
      data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
             {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
             {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
             {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
             {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}]},
     
     
     {type: "table", // could be "table", but just to show you could provide a custom template
      title: "Event Log",
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
             { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]}
      
       ], {title: "Full Report", template: "htmlOutput/template.html", pageNumbers: true, timestamp: true});


