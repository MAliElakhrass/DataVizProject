/**
 * Main file allowing the draw of the heatmap
 *
 */

(function (d3) {
    var panel = d3.select("#panel");

    /***** Configuration *****/
    var margin = {
        top: 35,
        right: 85,
        bottom: 85,
        left: 85
    };
    var width = 750 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    var attributes = ['Critic_Count', 'Critic_Score', 'EU_Sales','JP_Sales', 
                      'NA_Sales', 'Other_Sales', 'User_Count', 'Year_of_Release'];
    var legendHeight = 28;
    var barHeight = 8;
    var legendPadding = 9;
    var innerWidth = width - (legendPadding * 2);

    var spMargin = {
        top: 0,
        right: 40,
        bottom: 0,
        left: 40
    };
    var spWidth = 300 - spMargin.left - spMargin.right;
    var spHeight = 150 - spMargin.top - spMargin.bottom;

    /***** CreationScatter Plot Scale *****/
    var spx = d3.scaleLinear().range([0, spWidth]);
    var spy = d3.scaleLinear().range([spHeight, 0]);

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

    var spSVG = d3.select("#scatter")
                  .append("svg")
                  .attr("width", spWidth + spMargin.left + spMargin.right)
                  .attr("height", spHeight + spMargin.top + spMargin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + spMargin.left + "," + spMargin.top + ")");
    
    /***** Load data *****/
    promises = [d3.csv("./data/corr_matrix.csv"), d3.csv("./data/videogames.csv")];
    Promise.all(promises).then(function(results) {
        data = results[0];
        var value_col = data.map(function(value,index) { return value.V; });
        var colors = createColorScaleHeatMap(value_col);

        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0]);
        tip.html(function(d) {
            return getHeatMapTipText.call(this, d);
        });
        heatmapSVG.call(tip)
        createHeatMap(heatmapSVG, x, y, data, colors, tip, showPanel);

        var data_colors = createDataColor(colors);
        var extent = d3.extent(data_colors, d => d.value);
        var xScale = d3.scaleLinear()
                       .range([0, innerWidth])
                       .domain(extent);
        createAxisLegend(legendSVG, xScale, data_colors, barHeight);
        createLegend(legendSVG, data_colors, innerWidth, barHeight, extent);

        var g = legendSVG.select("g");
        /***** Information panel management *****/
        panel.select("button")
        .on("click", function () {
            panel.style("display", "none");
        });

        /**
         * Display the panel for a specific attribute.
         *
         * @param districtId    The number of the district to use to show the right information.
         */
        function showPanel(x, y) {
            var attr1 = parseDataScatterPlot(results[1], x);
            var attr2 = parseDataScatterPlot(results[1], y);

            console.log(attr1)
            console.log(attr2)

            
            var attr1 = results[1].map(row => row.x);
             results[1].map(row => row.y);
            console.log(attr1)
            domainXScatterPlot(spx, attr1)

            panel.style("display", "block");
        };
    });

})(d3);


