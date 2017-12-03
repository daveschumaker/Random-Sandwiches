const sortObj = require('sort-object');
const config = require('../config');
const intro = require('../data/newIntro');

let sandwichNames = []; // A cache of sandwiches.
let categories = {};

// Count number of times a particular sandwich name has been generated.
const countInArray = (array, what) => {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

// Adds generated sandwich name to our sandwich cache.
const addName = (name) => {
    sandwichNames.push(name);    
}

// Formats sandwich name so that if it already exists in our cache, we append a number to it.
const formatName = (name) => {
    let count = countInArray(sandwichNames, name);
    if (count > 0) {
        return `${name} NO. ${count + 1}`;
    }

    return name;
}

// Adds a particular sandwich to the category object for later use in generating our book.
const addToBook = (sandwich = {}) => {
    if (!categories[sandwich.category]) {
        categories[sandwich.category] = [];
    }

    categories[sandwich.category].push(sandwich);
}

const getData = () => {
    return categories;
}

const buildHtml = () => {
    let parsedData = [];
    let sortedCategories = sortObj(categories);

    parsedData.push(`<div class="title-section" style="text-align: center;">`)
    parsedData.push(`<h1>${config.title}</h1>`);
    parsedData.push(`<h2>by ${config.byLine}</h2>`);
    parsedData.push(`</div>`);
    parsedData.push(`<div class="toc-section">`)    
    parsedData.push(`<h2>Table of Contents</h2>`);
    parsedData.push('<ul>');
    parsedData.push(`<li><a href="#intro">FORWARD</a></li>`);
    for (key in sortedCategories) {
        parsedData.push(`<li><a href="#${key}">${key}</a></li>`);
    }
    parsedData.push('</ul>');
    parsedData.push(`</div>`);    
    parsedData.push(`<div class="book-section">`)    
    parsedData.push(`<h2>-== <a name="intro"></a>FORWARD</h2>`);
    parsedData.push(intro);

    for (key in sortedCategories) {
        parsedData.push(`<h2 style="text-align: center;"><a name="${key}"></a>SANDWICHES WITH ${key}</h2>`);
        categories[key].forEach((sandwich) => {
            let html = `<h4>${sandwich.name}</h4><p>${sandwich.description}</p>`
            parsedData.push(html);
        });
    }

    parsedData.push(`</div>`);        

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${config.title} by ${config.author}</title>
            <link rel="stylesheet" type="text/css" href="styles.css">
        </head>
        <body>
            ${parsedData.join('\n')}
        </body>
        </html> 
    `;

    console.log(parsedData);
}

module.exports = {
    addToBook,
    addName,
    buildHtml,
    formatName,
    getData
};