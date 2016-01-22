// OLD SERVER-SIDE STUFF (don't need)

// var d3 = require('d3');
// var jsdom = require('jsdom');
// var doc = jsdom.jsdom();

// var pie = require('./pie.js').pie();
// var graph = require('./graph.js').graph();

// INPUT USER DATA + APPEND CHART TO DIV 

var getTable = function(params){

	var chart = table()
		.data(params.data);

	var selector = params.containerId;
	var wrapper = document.getElementById(selector);

	var outerDiv = chart.outer();
	wrapper.appendChild(outerDiv);

	return chart;
};


var getPie = function(params){

	var chart = pie()
		.width(params.width)
		.height(params.height)
		.data(params.data);

	var selector = params.containerId;
	d3.select(document.getElementById(selector)).call(chart);
	var svg = d3.select(document.getElementById(selector)).node().outerHTML;

	// d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

	// var selector = params.containerId;
	// var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
	// d3.select(doc.getElementById(selector)).remove();

	return chart;
};


var getGraph = function(params){

	var chart = graph()
		.data(params.data)
		// .xAxisLabel(params.xAxisLabel)
		.width(params.width)
		.height(params.height)
		.yAxisLabel(params.yAxisLabel);

	var selector = params.containerId;
	d3.select(document.getElementById(selector)).call(chart);
	var svg = d3.select(document.getElementById(selector)).node().outerHTML;

	//d3.select("body").append('div').attr('id', params.containerId).call(chart);

	// var selector = params.containerId;
	// var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
	// d3.select(doc.getElementById(selector)).remove();

	return svg;
};



// D3 CODE FOR DRAWING CHARTS

var pie = function(){


// default values
var data = [],
	width=300,
	height=300;


var chart = function(container){

	var radius = Math.min(width, height) / 2;

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

	// if ("pie" in localStorage) data = pie.shift();
	// else data = JSON.parse(<%- JSON.stringify(raw)%>);

	for (var obj in data) {
	  data[obj].label = data[obj].label + ": " + data[obj].data + "%";
	}

	var g = svg.selectAll(".arc").data(pie(data))
	.enter().append("g").attr("class", "arc");

	g.append("path").attr("d", arc).style("fill", function(d) {return color(d.data.label); });

	g.append("text").attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
	.attr("dy", ".35em").text(function(d) { return d.data.label; })

};



chart.data = function(value) {
	if (!arguments.length) return data;
	if (value=="") throw new Error("Error: need input data"); // error message
	data = eval(value);
	return chart;
};

chart.width = function(value) {
	if (!arguments.length) return width;
	if (value=="")return chart;
	width = value;
	return chart;
};

chart.height = function(value) {
	if (!arguments.length) return height;
	if (value=="")return chart;
	height = value;
	return chart;
};

return chart;

}


//TODO: add more options to graph? such as: multiple series

// time series line graph
var graph = function(){


// default values
var data = [],
	outerWidth = 800,
	outerHeight = 450,
	yAxisLabel = "";


var chart = function(container){
	var margin = {top: 20, right: 80, bottom: 30, left: 80},
		width = outerWidth - margin.left - margin.right,
    	height = outerHeight - margin.top - margin.bottom;

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .ticks(10);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);

	var line = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.value); });

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .attr("display", "block")
	    .attr("style", "margin: auto")
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	 color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

	 data.forEach(function(d) {
	    d.date = new Date(d.date);
	  });

	 var cities = color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {date: d.date, value: +d[name]};
	      })
	    };
	  });

	  x.domain(d3.extent(data, function(d) { return d.date; }));

	  y.domain([
	    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
	    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
	  ]);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	    .selectAll("text")
	      .attr("y", 0)
	      .attr("x", 9)
	      .attr("dy", ".35em")
	      .attr("transform", "rotate(90)")
	      .style("text-anchor", "start");

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 0 - margin.left/2)
	      .attr("x",0 - (height / 2))
	      .attr("dy", ".71em")
	      .style("text-anchor", "middle")
	      .text(yAxisLabel);

	  svg.append("g")         
	      .attr("class", "grid")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis
	          .tickSize(-height, 0, 0)
	          .tickFormat("")
	          .ticks(60)
	      )

	  svg.append("g")         
	      .attr("class", "grid")
	      .call(yAxis
	          .tickSize(-width, 0, 0)
	          .tickFormat("")
	          .ticks(60)
	      )

	  var city = svg.selectAll(".city")
	      .data(cities)
	    .enter().append("g")
	      .attr("class", "city");

	  city.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
	      .style("stroke", function(d) { return color(d.name); });

	  city.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	       .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
	       .attr("x", 3)
	       .attr("dy", ".35em")
	       .text(function(d) { return d.name; });

};



// TODO: NEED DATA PARAM, OR ELSE CHART BREAKS
chart.data = function(value) {
	if (!arguments.length) return data;
	if (value=="") throw new Error("Error: need input data"); // error message
	data = eval(value);
	//data = value;
	return chart;
};

chart.width = function(value) {
	if (!arguments.length) return outerWidth;
	if (value=='')return chart;
	outerWidth = value;
	return chart;
};

chart.height = function(value) {
	if (!arguments.length) return outerHeight;
	if (value=="")return chart;
	outerHeight = value;
	return chart;
};

chart.yAxisLabel = function(value) {
	if (!arguments.length) return yAxisLabel;
	if (value=="")return chart;
	yAxisLabel = value;
	return chart;
};



return chart;

}



var table = function(){

var data = [];
var outerDiv;

var chart = function(container){

	// JS DOM CHART MADE FOR BOOTSTRAP CSS

  	outerDiv = document.createElement("div");
  	outerDiv.className = "container";

  	var div = document.createElement("div");
  	div.className = "bodycontainer scrollable";

  	var table = document.createElement("table");
  	table.className = "table table-striped header-fixed table-scrollable";

  	outerDiv.appendChild(div);
  	div.appendChild(table);


	// create DOM elements thead with id="head" and tbody with id="body"
	var head = document.createElement("thead");
	head.id = "head";
	var body = document.createElement("tbody");
	body.id = "body";


    // build table head (appending to DOM element "head")
    var arr = Object.keys(data[0]); // keys from table
    tr = document.createElement('tr');
    for (var j = 0; j < arr.length; j++) {
      th = document.createElement('th');
      th.appendChild(document.createTextNode(arr[j])); 
      tr.appendChild(th);
    }
    head.appendChild(tr);
    table.appendChild(head);


    // build table body (appending to DOM element "body")
    for (var i = 0; i < data.length; i++) { // for each object
      tr = document.createElement('tr'); // for each key
      for (var j = 0; j < arr.length; j++) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(data[i][arr[j]]));
        tr.appendChild(td);
      }
       body.appendChild(tr);
    }

    table.appendChild(body);

    return outerDiv;
};


chart.data = function(value) {
	if (!arguments.length) return data;
	if (value=="") throw new Error("Error: need input data"); // error message if data not inputted in examples.js
	// TODO: if data param is not inputed in template function.... then?
	data = value;
	return chart;
};

chart.outer = function(){
	return chart();
}

return chart;

}