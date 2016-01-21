var pdf = require('./htmlToPdf.js');

describe("Testing ejs2html", function() {
  pdf.ejs2html("templates/usageReportPieTemplate.ejs", 
    { raw : {type: "pie", 
         title: "Usage Report",
         data: [{label:"Running", data:20},
                {label:"Idle", data:60},
                {label:"Stalled", data:20}]}},
                 "templates/htmlOutput/pieChart.html");
});

describe("Testing appendTitle", function () {
  pdf.appendTitle("title.ejs", "Title", "./templates/htmlOutput/title.html");
});

describe("Testing appendBody", function () {
  pdf.appendBody([{type: "pie", 
         title: "Usage Report",
         data: [{label:"Running", data:20},
                {label:"Idle", data:60},
                {label:"Stalled", data:20}]}],
                "./templates/htmlOutput/body.html");        
});

describe("Testing createPDF", function () {
  pdf.createPDF('templates/template.html', 'output/test.pdf', false, false);
});

describe("Testing promptUser", function () {
  pdf.promptUser("./test.js");
});

describe("Testing checkIfExists", function () {
  pdf.checkIfExists("./test.js");
});

describe("Testing all template rendering start to finish", function () {
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
});

