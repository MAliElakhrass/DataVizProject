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

    var attributes = ['Critic_Count', 'Critic_Score', 'EU_Sales','JP_Sales', 'User_Score',
                      'NA_Sales', 'Other_Sales', 'User_Count', 'Year_of_Release'];
    var legendHeight = 28;
    var barHeight = 8;
    var legendPadding = 9;
    var innerWidth = width - (legendPadding * 2);

    var spMargin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60
    };
    var spWidth = 460 - margin.left - margin.right;
    var spHeight = 400 - margin.top - margin.bottom;

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
    
    /***** CreationScatter Plot Scale *****/
    var spx = d3.scaleLinear().range([0, spWidth]);
    var spy = d3.scaleLinear().range([spHeight, 0]);

    /***** Creation of Scatter Plot elements*****/
    var spSVG = d3.select("#scatter")
                  .append("svg")
                  .attr("width", spWidth + spMargin.left + spMargin.right)
                  .attr("height", spHeight + spMargin.top + spMargin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + spMargin.left + "," + spMargin.top + ")");
    createAxisScatterPlot(spSVG, spx, spy, spHeight);
    
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
            panel.style("display", "block");
            
            var attr1 = parseDataScatterPlot(results[1], x);
            var attr2 = parseDataScatterPlot(results[1], y);

            attr_data = [];
            for (i = 0; i < attr1.length; i++) {
                attr_data.push({
                    'x': attr1[i],
                    'y': attr2[i]
                })
            }

            updateDomains(spx, spy, attr1, attr2);
            updateAxis(spSVG, spx, spy, spHeight);
            updatePanelScatterPlot(spSVG, attr_data, spx, spy);
        }
    });

})(d3);


