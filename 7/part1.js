const { readFile } = require('../utils/fileUtils');
const { parseRules, bagsThatHoldTargetBag } = require('./day7');

readFile(__dirname, 'input.txt').then(rawText => {
    const rules = parseRules(rawText);
    const bagsThatHoldShinyGold = bagsThatHoldTargetBag(rules, 'shiny gold').length;
    console.log(bagsThatHoldShinyGold);
});