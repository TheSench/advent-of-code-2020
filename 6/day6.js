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

module.exports = {
    getGroups,
    answersInGroup,
    getInputSum
};