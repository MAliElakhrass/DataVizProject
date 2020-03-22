/**
 * Main file allowing the draw of the graphics.
 *
 */

function preprocessing(data, x, y, color) {
    parseWeight(data);
    domainX(x, data);
    domainY(y, data);
    domainColor(color, data);
}

(function (d3) {

    /***** Tabs *****/
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

    var subtabs = d3.selectAll(".subtabs li");

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
    var formatDecimal = d3.format(",.2f");
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var x = d3.scaleBand().range([0, barChartWidth]).round(0.05);
    var y = d3.scaleSqrt().range([barChartHeight, 0]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y).tickFormat(formatDecimal);

    /***** Creation Bar chart elements *****/
    var barChartSvg = d3.select("#bar-chart-svg")
                        .attr("width", barChartWidth + barChartMargin.left + barChartMargin.right)
                        .attr("height", barChartHeight + barChartMargin.top + barChartMargin.bottom);

    var barChartGroup = barChartSvg.append("g")
                                   .attr("transform", "translate(" + barChartMargin.left + "," + barChartMargin.top + ")");

    /***** Load data *****/
    var files = ["./data/weights_nonsale.csv", "./data/weights_sale.csv"]
    Promise.all(files.map(url => d3.csv(url))).then(function (results) {
        var currentData = results[0];

        /***** Data preprocessing *****/
        preprocessing(currentData, x, y, color);
        
        /***** Creation of the bar chart *****/
        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0]);
        tip.html(function(d) {
            return getToolTipText.call(this, d, currentData, formatDecimal);
        });
        barChartSvg.call(tip);
        createAxes(barChartGroup, xAxis, yAxis, barChartHeight);
        createBarChart(barChartGroup, currentData, x, y, color, tip, barChartHeight, formatDecimal);

        /***** Change dataset *****/
        subtabs.on("click", function (d, i) {
            var subself = this;
            var subindex = i;
            subtabs.classed("active", function () {
                return subself === this;
            });
            d3.selectAll(".subtabs .subtab")
            .classed("visible", function (d, i) {
                return subindex === i;
            });

            currentData = results[i];
            preprocessing(currentData, x, y, color);
            transition(barChartGroup, currentData, x, y, color, xAxis, barChartHeight, tip);
        });
    });

})(d3);
