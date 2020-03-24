"use strict";

/**
 * File allowing the creation of the heatmap.
 */

/**
 * Creates the axis for the heatmap.
 *
 * @param g       The SVG group in which the heatmap has to be drawn.
 * @param x       Scale to use for the X axis.
 * @param y       Scale to use for the Y axis.
 * @param height  Height of the graphic.
 */
function createAxis(g, x, y, height) {
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x))
     .selectAll("text")
     .attr("transform", "rotate(30) ")
     .style("text-anchor", "start");;

    g.append("g")
     .call(d3.axisLeft(y));
}

/**
 * Creates the heatmap.
 *
 * @param g       The SVG group in which the heatmap has to be drawn.
 * @param x       Scale to use for the X axis.
 * @param y       Scale to use for the Y axis.
 * @param data    Data to use.
 * @param myColor Color scale associating a color to a value.
 */
function createHeatMap(g, x, y, data, myColor) {
    g.selectAll()
     .data(data, function(d) {return d.x + ':' + d.y;})
     .enter()
     .append("rect")
     .attr("x", function(d) { return x(d.x) })
     .attr("y", function(d) { return y(d.y) })
     .attr("width", x.bandwidth())
     .attr("height", y.bandwidth())
     .style("fill", function(d) { return myColor(d.V)} )
}

function createDataColor(colors) {
    var data_colors = []
    var min = -1;
    for (var i=0; i<=8; i++){
        data_colors.push({
            "color":colors(min), "value":min
        });
        min += 0.25;
    }

    return data_colors
}

function createAxisLegend(g, x, data_colors, height) {
    var xTicks = data_colors.map(d => d.value);
    var xAxis = d3.axisBottom(x)
                  .tickSize(height * 1.5)
                  .tickValues(xTicks);

    g.append("g")
     .call(xAxis)
     .select(".domain")
     .remove();
}

function createLegend(g, data_colors, innerWidth, barHeight, extent) {
    var defs = g.append("defs");
    var linearGradient = defs.append("linearGradient")
                             .attr("id", "myGradient");
    linearGradient.selectAll("stop")
                  .data(data_colors)
                  .enter()
                  .append("stop")
                  .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
                  .attr("stop-color", d => d.color);

    g.append("rect")
     .attr("width", innerWidth)
     .attr("height", barHeight)
     .style("fill", "url(#myGradient)");
}
