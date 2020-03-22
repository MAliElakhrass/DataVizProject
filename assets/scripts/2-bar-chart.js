"use strict";

/**
 * File allowing the create the bar chart.
 */


/**
 * Creates the axis for the bar chart.
 *
 * @param g       The SVG group in which the bar chart has to be drawn.
 * @param yAxis   Y axis.
 * @param height  Height of the graphic.
 */
function createAxes(g, xAxis, yAxis, height) {
  g.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(" + 0 + "," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(30) ")
    .style("text-anchor", "start");

  g.append("g")
    .attr("class", "axis y")
    .call(yAxis)
    .append("text")
    .text('Coefficient')
    .attr("fill", "#000")
    .style("text-anchor", "middle")
    .attr("transform", "translate(0,-10)");
}

/**
 * Bar chart.
 *
 * @param g             The SVG group in which the bar chart has to be drawn.
 * @param currentData   Data to use.
 * @param x             Scale to use for the X axis.
 * @param y             Scale to use for the Y axis.
 * @param color         Color scale associating a color to a BIXI station name.
 * @param tip           Tooltip to show when a bar has been hovered.
 * @param height        Height of the graphic.
 */
function createBarChart(g, data, x, y, color, tip, height) {

    var bars = g.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .style("fill", d => color(d.columns))
                .attr("x", d =>  x(d.columns))
                .attr("width", x.bandwidth())
                .attr("y",  d => { return height; })
                .attr("height", 0);

    bars.transition()
        .duration(750)
        .delay(function (d, i) {
            return i * 150;
        })
        .attr("y",  d => { return y(d.weights); })
        .attr("height",  d => { return height - y(d.weights); });

    bars.on('mouseover', tip.show)
        .on('mouseout', tip.hide);

}

/**
 * Returns the appropriate text for the tooltip.
 *
 * @param d               Data associated to the currently hovered bar.
 * @param currentData     Data currently used.
 * @param formatPercent   Function allowing to correctly format a percentage.
 * @return {string}       Tooltip's text to be shown.
 */
function getToolTipText(d, data, formatDecimal) {
    var total = d3.sum(data, d => d.weights);
    return formatDecimal(d.weights) + " (" + formatDecimal(d.weights/total) + ")";
}

function transition(g, newData, x, y, color, xAxis, barChartHeight, tip) {
    g.select('.x.axis')
     .transition()
     .duration(750)
     .call(xAxis);

    var bars = g.selectAll("rect")
                .remove()
                .exit()
                .data(newData)
                .enter()
                .append("rect")
                .style("fill", d => color(d.columns))
                .attr("x", d =>  x(d.columns))
                .attr("width", x.bandwidth())
                .attr("y",  d => { return barChartHeight; })
                .attr("height", 0);

    bars.transition()
        .duration(1000)
        .delay(function (d, i) {
            return i * 150;
        })
        .attr("y",  d => { return y(d.weights); })
        .attr("height",  d => { return barChartHeight - y(d.weights); });

    bars.on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}
