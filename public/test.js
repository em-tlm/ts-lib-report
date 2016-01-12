var pdf = require('./htmlToPdf.js');
var args = process.argv.slice(1);
if (args.length < 3) {
	//console.log("Insufficient Arguments:\n\n\tnode test.js 'path/to/output/file' 'type' data");
	pdf.output("output/pie.pdf", 
			[{label:"Running", data:20},
               {label:"Idle", data:60},
               {label:"Stalled", data:20}], 
               {type: "pie", pageNumbers: "off", timestamp: "on"});
} else {
	pdf.output(args[1], args[2], args[3]);
}


// pdf.output("output/table.pdf", "table", 3);
// pdf.output("output/graph.pdf", "graph", 3);

