var d3 = require('d3');
var jsdom = require('jsdom');
var doc = jsdom.jsdom();

var pie = require('./pie.js').pie();
var graph = require('./graph.js').graph();

var getTable = function(params){
	// does not use d3
	// can be purely html template
};

var getPie = function(params){

	var chart = pie()
		.data(params.data)

	d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

	var selector = params.containerId;
	var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
	d3.select(doc.getElementById(selector)).remove();

	return svg;
};


var getGraph = function(params){

	var chart = graph()
		.data(params.data)
		.xAxisLabel(params.xAxisLabel)
		.yAxisLabel(params.yAxisLabel);

	d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

	var selector = params.containerId;
	var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
	d3.select(doc.getElementById(selector)).remove();

	return svg;
};