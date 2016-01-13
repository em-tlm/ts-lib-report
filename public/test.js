var pdf = require('./htmlToPdf.js');
var args = process.argv.slice(1);
if (args.length < 3) {
	
	pdf.output("output/pie.pdf", 
			[{label:"Running", data:20},
               {label:"Idle", data:60},
               {label:"Stalled", data:20}], 
               {title: "PIE CHART", type: "pie", pageNumbers: "on", timestamp: "on"});

	pdf.output("output/graph.pdf", 
			[{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
               {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
               {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
               {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
               {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}], 
               {type: "graph", pageNumbers: "on", timestamp: "on"});

	pdf.output("output/table.pdf", 
			[ { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
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
                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ], 
               {type: "table", pageNumbers: "on", timestamp: "on"});
} else {
	pdf.output(args[1], args[2], args[3]);
}


