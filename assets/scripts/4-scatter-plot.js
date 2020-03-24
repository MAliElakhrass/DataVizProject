"use strict";

/**
 * File allowing the creation of the scatter plot.
 */

function createAxisScatterPlot(g, x, y, height) {
    g.append("g")
     .attr("class", "sp axis x")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

    g.append("g")
     .attr("class", "sp axis y")
     .call(d3.axisLeft(y));
}

/**
 * Update the X and Y domains used by the horizontal bar chart when the data is modified. 
 *
 * @param districtSource    The data associated to a district
 * @param x                 The X scale
 * @param y                 The Y scale
 */
function updateDomains(x, y, attribute1, attribute2) {
    x.domain([0, d3.max(attribute1)]);
    y.domain([0, d3.max(attribute2)]);  
}

function updateAxis(g, x, y) {
    var xAxis = d3.axisBottom(x);
    g.select('.x.axis.sp')
     .call(xAxis.tickFormat(function (d) {
        return d3.format(".2f")(d)
     }));
    
    var yAxis = d3.axisLeft(y); 
    g.select('.y.axis.sp')
     .call(yAxis);
}

function updatePanelScatterPlot(g, data, x, y) {
    g.selectAll("circle").remove();

    g.append("g")
     .selectAll("dot")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function (d) {
        return x(d.x); } )
    .attr("cy", function (d) { 
        return y(d.y); } )
    .attr("r", 1.5)
    .style("fill", "#69b3a2");
}
