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

function maxBags(rules, bag) {
    return 0;
}

module.exports = {
    parseRule,
    parseRules,
    maxBags
};