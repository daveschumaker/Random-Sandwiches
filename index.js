const fs = require('fs');
const path = require('path');

const config = require('./config');
const parseText = require('./lib/parseText');
const buildBook = require('./lib/buildBook');
const sandwichModel = require('./models/Sandwich');
const sandwichNames = require('./lib/sandwichNames');

var today = new Date();

const ITERATIONS = config.numSandwiches; // Number of sandwiches to create.
let currentIteration = 0;

const filePath = path.resolve('./data/raw_data.txt');
parseText.init(filePath);

while (currentIteration < ITERATIONS) {
    let description = parseText.generateDetails();    
    let rawName = sandwichNames.generateName(description);
    let formattedName = buildBook.formatName(rawName);
    buildBook.addName(rawName);

    let newSandwich = sandwichModel({
        name: formattedName,
        category: parseText.categorize(description),
        description: description
    });

    buildBook.addToBook(newSandwich);
    currentIteration++;
}

const book = buildBook.buildHtml();
fs.writeFile("./output/random-sandwiches.html", book, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log(book);
    console.log('\n\nThe file was saved!');
    console.log('Current word length:', book.split(' ').length);
});