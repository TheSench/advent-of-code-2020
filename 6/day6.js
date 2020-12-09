function getGroups(rawText) {
    return rawText.split(/\r?\n\r?\n/)
        .map(group => ({
            responses: group.split(/\r?\n/)
        }));
}

function answeredByEveryone({ responses }) {
    const answerCounts = responses
        .map(answer => new Set(answer))
        .reduce((counts, answer) => {
            answer.forEach(letter => counts[letter] = (counts[letter] || 0) + 1);
            return counts;
        }, {});

    return Object.values(answerCounts)
        .filter(count => count === responses.length)
        .length;
}

function answeredByAnyone(group) {
    const letters = group.responses.join('');
    return [...new Set(letters)].length;
}

function sumOfAnsweredByAnyone(rawText) {
    return getGroups(rawText)
        .map(group => answeredByAnyone(group))
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
    answeredByAnyone,
    sumOfAnsweredByAnyone,
    sumOfAnsweredByEveryone
};