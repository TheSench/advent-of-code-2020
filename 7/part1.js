const { readFile } = require('../utils/fileUtils');
const { parseRules, maxBags } = require('./day7');

readFile(__dirname, 'input.txt').then(rawText => {
    const rules = parseRules(rawText);
    const numBags = maxBags(rules, 'shiny gold');
    console.log(numBags);
});