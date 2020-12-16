const { readFile } = require('../utils/fileUtils');
const { parseRules, otherBagsHeldByBag } = require('./day7');

readFile(__dirname, 'input.txt').then(rawText => {
    const rules = parseRules(rawText);
    const bagsThatHoldShinyGold = otherBagsHeldByBag(rules, 'shiny gold');
    console.log(bagsThatHoldShinyGold);
});