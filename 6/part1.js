const fs = require('fs');

function getGroups(rawText) {
    return rawText.split(/\r?\n\r?\n/);
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const rawText = data.toString();
    const allGroups = getGroups(rawText);
});

module.exports = {
    getGroups
};