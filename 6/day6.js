const fs = require('fs');

function getGroups(rawText) {
    return rawText.split(/\r?\n\r?\n/)
        .map(group => ({
            responses: group.split(/\r?\n/)
        }));
}

function answeredByEveryone(group) {
    const letters = [...group.responses.join('')];
    return [...new Set(letters)].length;
}

function sumOfAnsweredByAnyone(rawText) {
    return getGroups(rawText)
        .map(group => answeredByEveryone(group))
        .reduce((total, next) => total + next);
}

function sumOfAnsweredByEveryone(rawText) {
    return getGroups(rawText)
        .map(group => answeredByEveryone(group))
        .reduce((total, next) => total + next);
}

module.exports = {
    getGroups,
    answeredByEveryone,
    sumOfAnsweredByAnyone,
    sumOfAnsweredByEveryone
};