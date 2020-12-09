const fs = require('fs');

function getGroups(rawText) {
    return rawText.split(/\r?\n\r?\n/)
        .map(group => ({
            responses: group.split(/\r?\n/)
        }));
}

function answersInGroup(group) {
    const letters = [...group.responses.join('')];
    return [...new Set(letters)].length;
}

function getInputSum(rawText) {
    return getGroups(rawText)
        .map(group => answersInGroup(group))
        .reduce((total, next) => total + next);
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const rawText = data.toString();
    const sum = getInputSum(rawText);
    console.log(sum);
});

module.exports = {
    getGroups,
    answersInGroup,
    getInputSum
};