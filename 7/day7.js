const { readFile } = require('../utils/fileUtils');
const { splitIntoLines } = require('../utils/stringSplitters');

const RULE_REGEX = / contains? /
function parseRule(line) {
    const [type, contains] = line.split(/ bags? contains? /);
    const contents = contains.split(', ')
        .map(containedBag => containedBag.match(/(?<count>\d+) (?<type>\w+ \w+) bags?/))
        .filter(match => match)
        .reduce((contents, {groups}) => 
            Object.assign(contents, { [groups.type]: Number(groups.count) })
        , {});

    return {
        [type.trim()]: contents
    };
}

function parseRules(text) {
    return splitIntoLines(text)
        .map(parseRule)
        .reduce((rules, rule) =>
            Object.assign(rules, rule)
        , {});
}

function amountHeldByBag(rules, bagToCheck, bagToHold, numBags = 1) {
    const ruleForBagToCheck = (rules[bagToCheck] || {});
    const amountBagHolds = ruleForBagToCheck[bagToHold] || 0;
    if (amountBagHolds) {
        return amountBagHolds * numBags;
    } else {
        return Object.entries(ruleForBagToCheck)
            .reduce((currentMax, [newBagToCheck, numNewBags]) => 
                Math.max(currentMax, amountHeldByBag(rules, newBagToCheck, bagToHold, numNewBags * numBags))
            , 0);
    }
}

module.exports = {
    parseRule,
    parseRules,
    amountHeldByBag
};