"use strict";

/**
 * File allowing to preprocess data in the CSV files.
 */

/**
 * Initializes data from the CSV files by transforming strings that represent
 * numbers to the Javascript type "number".
 *
 * @param data    Data that comes from a CSV file
 */
function parseWeight(data) {
    data.forEach(row => {
        row.weights = parseFloat(row.weights);
    });
}

/**
 * 
 * Specifies the color domain for each parameters.
 *
 * @param color   Color scale.
 * @param data    Data from JSON file.
 */
function domainColor(color, data) {
    var parameters = data.map(row => row.columns);
  
    color.domain(parameters);
}

/**
 * Set the domain scale for the X axis of the bar chart.
 *
 * @param x     X scale to use.
 */
function domainX(x, data) {
    var parameters = data.map(row => row.columns);

    x.domain(parameters)
}
  
/**
 * Set the domain scale for the Y axis of the bar chart.
 *
 * @param y     Y scale to use.
 */
function domainY(y, data) {
    var coefs = data.map(d => d.weights);
    y.domain([d3.min(coefs), d3.max(coefs)]);
}