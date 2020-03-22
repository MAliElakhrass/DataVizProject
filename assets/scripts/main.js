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

})(d3);
