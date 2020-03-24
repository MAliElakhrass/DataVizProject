/**
 * Main file allowing the draw of the heatmap
 *
 */

(function (d3) {

    /***** Configuration *****/
    var margin = {
        top: 35,
        right: 85,
        bottom: 85,
        left: 85
    };
    var width = 750 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    var attributes = ['Critic_Count', 'Critic_Score', 'Developer', 'EU_Sales', 'Genre',
                      'JP_Sales', 'NA_Sales', 'Other_Sales', 'Platform', 'Publisher',
                      'Rating', 'User_Count', 'Year_of_Release'];
    var legendHeight = 28;
    var barHeight = 8;
    var legendPadding = 9;
    var innerWidth = width - (legendPadding * 2);

    /***** Creation Heatmap elements *****/
    var heatmapSVG = d3.select('#heatmap-svg')
                      .append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand().range([0, width]).domain(attributes).padding(0.01);
    var y = d3.scaleBand()
              .range([ height, 0 ])
              .domain(attributes)
              .padding(0.01);
    createAxis(heatmapSVG, x, y, height);

    /***** Creation of legend elements *****/
    var legendSVG = d3.select("#legend-svg")
                      .append("svg")
                      .attr("width", width)
                      .attr("height", legendHeight)
                      .append("g")
                      .attr("transform", "translate(" + legendPadding + ", 0)");

    /***** Load data for heatmap *****/
    d3.csv("./data/corr_matrix.csv").then(function (data) {
        var value_col = data.map(function(value,index) { return value.V; });
        var colors = createColorScaleHeatMap(value_col);

        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0]);
        tip.html(function(d) {
            return getHeatMapTipText.call(this, d);
        });
        heatmapSVG.call(tip)
        createHeatMap(heatmapSVG, x, y, data, colors, tip);

        var data_colors = createDataColor(colors);
        var extent = d3.extent(data_colors, d => d.value);
        var xScale = d3.scaleLinear()
                       .range([0, innerWidth])
                       .domain(extent);
        createAxisLegend(legendSVG, xScale, data_colors, barHeight);
        createLegend(legendSVG, data_colors, innerWidth, barHeight, extent);
    });

})(d3);
