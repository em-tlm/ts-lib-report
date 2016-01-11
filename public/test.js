var pdf = require('./newHTMLtoPDF.js');
var args = process.argv.slice(1);
if (args.length != 4) {
	console.log("Insufficient Arguments:\n\n\tnode test.js 'path/to/output/file' 'type' data");
} else {
	pdf.output(args[1], args[2], args[3]);
}

// pdf.output("output/table.pdf", "table", 3);
// pdf.output("output/graph.pdf", "graph", 3);
// pdf.output("output/pie.pdf", "pie", [{label:"Running", data:20},
//                {label:"Idle", data:60},
//                {label:"Stalled", data:20}]);

// power
// hdmi camble keyboard mouse
