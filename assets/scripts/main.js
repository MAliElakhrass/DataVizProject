/**
 * Main file allowing the draw of the graphics.
 *
 */

(function (d3) {

    /***** Tab *****/
    var tabs = d3.selectAll(".tabs li");
    tabs.on("click", function (d, i) {
        var self = this;
        var index = i;
        tabs.classed("active", function () {
            return self === this;
        });
        d3.selectAll(".tabs .tab")
        .classed("visible", function (d, i) {
            return index === i;
        });
    });


    /***** Configuration *****/
    var barChartMargin = {
        top: 55,
        right: 50,
        bottom: 150,
        left: 50
    };
    var barChartWidth = 980 - barChartMargin.left - barChartMargin.right;
    var barChartHeight = 550 - barChartMargin.top - barChartMargin.bottom;

    /***** Scales *****/
    var formatPercent = d3.format(".0%");
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var x = d3.scaleBand().range([0, barChartWidth]).round(0.05);
    var y = d3.scaleLinear().range([barChartHeight, 0]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y).tickFormat(formatPercent);

    /***** Creation Bar chart elements *****/
    var barChartSvg = d3.select("#bar-chart-svg")
                        .attr("width", barChartWidth + barChartMargin.left + barChartMargin.right)
                        .attr("height", barChartHeight + barChartMargin.top + barChartMargin.bottom);

    var barChartGroup = barChartSvg.append("g")
                                   .attr("transform", "translate(" + barChartMargin.left + "," + barChartMargin.top + ")");

    /***** Load data *****/
    d3.csv("./data/weights.csv").then(function (data) {
        var currentData = data[0];
        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0]);
        
        /***** Data preprocessing *****/
        parseWeight(data);
        domainX(x, data);
        domainY(y, data);
        domainColor(color, data);

        /***** Creation of the bar chart *****/
        createAxes(barChartGroup, xAxis, yAxis, barChartHeight);
        createBarChart(barChartGroup, data, x, y, color, tip, barChartHeight);

    })

})(d3);
