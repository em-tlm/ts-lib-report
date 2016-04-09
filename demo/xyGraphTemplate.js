
if (rawdata.length < 3) {
    console.log("ERROR: Must lable axis.");
}
var box_width = dim.width - 2 * dim.margin;
var box_height = Math.round(box_width * 450 / 800);
var xKey = Object.keys(rawdata[0])[0];
var yKey = Object.keys(rawdata[0])[1];
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = box_width - margin.left - margin.right,
    height = box_height - margin.top - margin.bottom;
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");
var line = d3.svg.line()
        .x(function(d) { return x(d[xKey]); })
        .y(function(d) { return y(d[yKey]); });
var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
x.domain(d3.extent(rawdata, function(d) { return d[xKey]; }));
y.domain(d3.extent(rawdata, function(d) { return d[yKey]; }));
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("dy", "3em")
    .attr("dx", "3em")
    .style("text-anchor", "end")
    .text(xTitle);
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(yTitle);
svg.append("path")
    .datum(rawdata)
    .attr("class", "line")
    .attr("d", line);
