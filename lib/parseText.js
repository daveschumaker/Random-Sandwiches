const _ = require('lodash');
const fs = require('fs');
const Markov = require('markov-strings');

const ingredients = require('./ingredients');

const rawData = {
    titles: [],
    descriptions: []
};

const generatedData = {
    titles: {}, // Use to prevent duplicate sandwich names from popping up.
    altSandwichNames: {},
    markovTitles: {},
    markovDescriptions: {},
    categories: {
        fish: [],
        egg: [],
        salad: [],
        meat: [],
        cheese: [],
        nut: [],
        sweet: [],
        miscellaneous: [],
        canapes: []
    }
};

const parseText = {
    init: function(filePath) {
        const data = parseText.loadData(filePath);
        const dataArray = data.split('\n');

        dataArray.forEach(function (str) {
            // Skip blank lines
            if (str === '') {
                return;
            }

            // Sandwich names are ALL CAPS in our source text.
            if (str === str.toUpperCase()) {
                rawData.titles.push(str);
                return;
            }

            // Spice up descriptions?
            parseText.splitSentences(str)
        });

        generatedData.markovDescriptions = new Markov(rawData.descriptions, {
            minWords: 24,
            stateSize: 2 // 2 is default and pretty good. 1 is totally random.
        });

        generatedData.markovDescriptions.buildCorpusSync();

    },
    splitSentences(description) {
        // If our sentences are too crazy or random, use this instead:
        /**
        rawData.descriptions.push(description);
        return;
        */

        let dataArray = description.split('.');

        dataArray.forEach(function (str) {
            rawData.descriptions.push(str);
        });
    },
    loadData: function(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    },
    generateTitle: function () {
        let foundMatch = true;
        let title;

        while (foundMatch) {
            let checkTitle = Math.floor((Math.random() * 100) + 1);
            let newTitle = generatedData.markovTitles.generateSentenceSync().string;

            // Add more variety to our sandwich titles by randomly appending 'AND'
            if (checkTitle < 50) {
                newTitle = newTitle.replace(' SANDWICH', '');
                newTitle = newTitle + ' AND ' + generatedData.markovTitles.generateSentenceSync().string;
            }

            if (!generatedData.titles[newTitle]) {
                foundMatch = false;
                title = newTitle;
                generatedData.titles[newTitle] = true;
            }
        }

        return title;
    },
    generateDetails: function () {
        let description = generatedData.markovDescriptions.generateSentenceSync().string;
        if (description[description.length - 1] !== '.') {
            description = description + '.';
        }

        return description;
    },
    totalWords: function() {
        let titleWordCount = rawData.titles.join(' ').split(' ').length;
        let descriptionWordCount = rawData.titles.join(' ').split(' ').length;

        return titleWordCount + descriptionWordCount;
    },
    categorize: function(description) {
        function isInString(needle, haystack) {
            if (description.indexOf(needle) > -1) {
                return needle;
            } else {
                return false;
            }
        }

        function checkForStringInArray(arr) {
            var inString = false;
            for (var i = 0; i < arr.length; i++) {
                inString = isInString(arr[i], description);
                if (inString) break;
            }
            return inString;
        }

        if (checkForStringInArray(ingredients.fish)) {
            return 'FISH';
        }

        if (checkForStringInArray(ingredients.eggs)) {
            return 'EGG';
        }

        if (checkForStringInArray(ingredients.salad)) {
            return 'SALAD';
        }

        if (checkForStringInArray(ingredients.meats)) {
            return 'MEAT';
        }

        if (checkForStringInArray(ingredients.cheese)) {
            return 'CHEESE';
        }

        if (checkForStringInArray(ingredients.nuts)) {
            return 'NUTS';
        }

        if (checkForStringInArray(ingredients.sweet)) {
            return 'SWEET';
        }

        if (checkForStringInArray(ingredients.canapes)) {
            return 'CANAPES';
        }

        return 'MISCELLANEOUS';
    }
};

module.exports = parseText;