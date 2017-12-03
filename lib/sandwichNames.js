const ingredients = require('./ingredients');

const sandwichNames = {
    generateName: function(description) {
        function isInString(needle, haystack) {
            if (description.indexOf(needle) > -1) {
                return needle;
            } else {
                return;
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

        function checkDescriptors() {
            let descriptor;

            for (key in ingredients.descriptors) {
                if (description.indexOf(key) > -1) {
                    descriptor = ingredients.descriptors[key].toUpperCase()
                    break;
                }
            }
            if (descriptor) {
                return descriptor + ' ';
            } else {
                return '';
            }
        }

        let nameArray = [].concat(
            checkForStringInArray(ingredients.fish),
            checkForStringInArray(ingredients.eggs),
            // checkForStringInArray(ingredients.salad),
            checkForStringInArray(ingredients.meats),
            checkForStringInArray(ingredients.cheese),
            checkForStringInArray(ingredients.nuts),
            checkForStringInArray(ingredients.sweet),
            checkForStringInArray(ingredients.canapes),
            checkForStringInArray(ingredients.random)
        );

        // Filter out empty names...
        nameArray = nameArray.filter(function(n){ return n != undefined });

        // if (nameArray.length === 0) {
        //     return '...' + sandwichNames.getRandom() + ' ' + 'SANDWICH';
        // } else {
            if (nameArray.length > 2) {
                nameArray.splice(nameArray.length - 1, 0, 'AND');
                let nameString = nameArray.join(', ').toUpperCase() + ' SANDWICH';
                return checkDescriptors() + nameString.replace('AND,', 'AND');
            } else {
                return checkDescriptors() + nameArray.join(' AND ').toUpperCase() + ' SANDWICH';
            }
        // }
    },
}

module.exports = sandwichNames;