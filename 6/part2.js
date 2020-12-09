const { readFile } = require('../utils/fileUtils');
const { sumOfAnsweredByEveryone } = require('./day6');

readFile(__dirname, 'input.txt').then(rawText => {
    const sum = sumOfAnsweredByEveryone(rawText);
    console.log(sum);
});