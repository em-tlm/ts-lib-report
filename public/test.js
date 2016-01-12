var pdf = require('./htmlToPdf.js');
var args = process.argv.slice(1);
if (args.length < 3) {
	//console.log("Insufficient Arguments:\n\n\tnode test.js 'path/to/output/file' 'type' data");
	pdf.output("output/pie.pdf", 
			[{label:"Running", data:20},
               {label:"Idle", data:60},
               {label:"Stalled", data:20}], 
               {type: "pie", pageNumbers: "on", timestamp: "on"});

	// pdf.output("output/graph.pdf", 
	// 		[{value:3, date:"2000-01-01T05:00:00"},
 //               {value:8, date:"2000-01-01T06:30:00"},
 //               {value:5, date:"2000-01-01T11:15:00"},
 //               {value:13, date:"2000-01-01T22:00:00"},
 //               {value:4, date:"2000-01-02T05:00:00"}], 
 //               {type: "graph", pageNumbers: "on", timestamp: "on"});

	// pdf.output("output/table.pdf", 
	// 		[ { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
 //                    { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ], 
 //               {type: "table", pageNumbers: "on", timestamp: "on"});
} else {
	pdf.output(args[1], args[2], args[3]);
}


// pdf.output("output/table.pdf", "table", 3);
// pdf.output("output/graph.pdf", "graph", 3);

