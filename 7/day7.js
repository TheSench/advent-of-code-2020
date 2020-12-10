const { readFile } = require('../utils/fileUtils');
const { splitIntoLines } = require('../utils/stringSplitters');

const RULE_REGEX = / contains? /
function parseRule(line) {
    const [type, contains] = line.split(/ bags? contains? /);
    const contents = contains.split(', ')
        .map(containedBag => containedBag.match(/(?<count>\d+) (?<type>\w+ \w+) bags?/))
        .filter(match => match)
        .map(({ groups }) => ({
            count: Number(groups.count),
            type: groups.type
        }));

    return {
        type,
        contents
    };
}

function parseRules(text) {
    return splitIntoLines(text)
        .map(parseRule);
}

module.exports = {
    parseRule,
    parseRules
};