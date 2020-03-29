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
 * Initializes data from the CSV files by transforming strings that represent
 * numbers to the Javascript type "number".
 *
 * @param data    Data that comes from a CSV file
 */
function parseDataHeatmap(data) {
    var attributeNames = d3.keys(data[0]);

    var corrMatrix = []

    data.forEach(row => {
        var rowValues = [row.Platform, row.Year_of_Release, row.Genre, row.Publisher,
                        row.NA_Sales, row.EU_Sales, row.JP_Sales, row.Other_Sales,
                        row.Critic_Score, row.Critic_Count, row.User_Count,
                        row.Developer, row.Rating ];
        corrMatrix.push(rowValues)
    });

    return [attributeNames, corrMatrix]
}

/**
 * Initializes data from the CSV files by transforming strings that represent
 * numbers to the Javascript type "number".
 *
 * @param data    Data that comes from a CSV file
 */
function parseDataScatterPlot(data, attributeName) {
    switch(attributeName) {
        case 'Critic_Count':
            return data.map(row => parseFloat(row.Critic_Count));
        case 'Critic_Score':
            return data.map(row => parseFloat(row.Critic_Score));
        case 'EU_Sales':
            return data.map(row => parseFloat(row.EU_Sales));
        case 'JP_Sales':
            return data.map(row => parseFloat(row.JP_Sales));
        case 'NA_Sales':
            return data.map(row => parseFloat(row.NA_Sales));
        case 'Other_Sales':
            return data.map(row => parseFloat(row.Other_Sales));
        case 'User_Score':
            return data.map(row => parseFloat(row.User_Score));
        case 'User_Count':
            return data.map(row => parseFloat(row.User_Count));
        case 'Year_of_Release':
            return data.map(row => parseFloat(row.Year_of_Release));
        default:
            console.log(attributeName);
          break;
    }
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
 * 
 * Specifies the color domain for the correlation value
 *
 * @param color   Color scale.
 * @param data    Data from JSON file.
 */
function createColorScaleHeatMap(data) {
    return d3.scaleSequential(d3.interpolateRdBu).domain([-1, d3.max(data)]);
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

/**
 * Function that sort two string value
 *
 * @param a     First string value.
 * @param b     Second string value.
 */
function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

/**
 * Sort the data (weight) 
 *
 * @param data         data from two CSV file.
 * @param valueSort    3 value possible [Attribute Name, Ascending, Descending]     
 */
function sort(data, currentData, valueSort) {
    data.forEach(element => {
        element.sort(function(x, y){
            if (valueSort == 0) {
                return compareStrings(x.columns, y.columns);
            } else if (valueSort == 1) {
                return d3.ascending(x.weights, y.weights);
            } else if (valueSort == 2) {
                return d3.descending(x.weights, y.weights);
            }
        });
    });

    currentData.sort(function(x, y){
        if (valueSort == 0) {
            return compareStrings(x.columns, y.columns);
        } else if (valueSort == 1) {
            return d3.ascending(x.weights, y.weights);
        } else if (valueSort == 2) {
            return d3.descending(x.weights, y.weights);
        }
    });

    return data, currentData
}