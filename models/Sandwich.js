const Sandwich = function({
    name = '',
    category = '',
    description = ''
} = {}) {
    return {
        name: String(name),
        category: String(category),
        description: String(description)
    };
}

module.exports = Sandwich;