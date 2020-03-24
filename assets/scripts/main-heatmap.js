/**
 * Main file allowing the draw of the heatmap
 *
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

function createColorScale() {
    return d3.scaleSequential(d3.interpolateReds).domain([-0.33, 1]); //.range(d3.interpolatePurples[10])
}

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
    var legendElementWidth = (Math.floor(width / 13)) * 1.5;
    
    var attributes = ['Critic_Count', 'Critic_Score', 'Developer', 'EU_Sales', 'Genre',
                      'JP_Sales', 'NA_Sales', 'Other_Sales', 'Platform', 'Publisher',
                      'Rating', 'User_Count', 'Year_of_Release'];

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
    var colors = createColorScale();
    console.log(colors(0))
/*
    var legend = heatmapSVG.selectAll(".legend")
                           .data([0].concat(colors.quantiles()), function(d) { return d; })
                           .enter()
                           .append("g")
                           .attr("class", "legend");
    
    legend.append("rect")
          .attr("x", function(d, i) { return legendElementWidth * i - 50; })
          .attr("y", function(d, i) { return (height + 50); })
          .attr("width", legendElementWidth)
          .attr("height", Math.floor(width / 13))
          .style("fill", function(d, i) { return d3.scaleQuantile(d3.interpolateReds)[i]; });
               
    legend.append("text")
          .attr("class", "mono")
          .text(function(d) { return "> " + d.toString(); })
          .attr("x", function(d, i){ return legendElementWidth * i - 40;})
          .attr("y", function(d, i) { return (height + 30 + Math.floor(width / 13)); })
    */
    /***** Load data for heatmap *****/
    d3.csv("./data/corr_matrix.csv").then(function (data) {
        console.log(data)
        var V = data.map(function(value,index) { return value.V; });
        
        createHeatMap(heatmapSVG, x, y, data, colors)
    });

})(d3);