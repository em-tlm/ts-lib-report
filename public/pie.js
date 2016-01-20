//var d3 = require('d3');

exports.pie = function(){


// default values
var rawdata = [];

var chart = function(container){

	var width = 300,
	    height = 300,
	    radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);

	var labelArc = d3.svg.arc()
	    .outerRadius(radius - 40)
	    .innerRadius(radius - 40);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.data; });

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("display", "block")
	    .attr("style", "margin: auto;")
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	// if ("pie" in localStorage) rawdata = pie.shift();
	// else rawdata = JSON.parse(<%- JSON.stringify(raw)%>);

	for (var obj in rawdata) {
	  rawdata[obj].label = rawdata[obj].label + ": " + rawdata[obj].data + "%";
	}

	var g = svg.selectAll(".arc").data(pie(rawdata))
	.enter().append("g").attr("class", "arc");

	g.append("path").attr("d", arc).style("fill", function(d) {return color(d.data.label); });

	g.append("text").attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
	.attr("dy", ".35em").text(function(d) { return d.data.label; })

};



// TODO: NEED DATA PARAM, OR ELSE CHART BREAKS
chart.data = function(value) {
	if (!arguments.length) return data;
	data = value;
	return chart;
};



return chart;

}