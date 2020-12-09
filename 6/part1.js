const { readFile } = require('../utils/fileUtils');
const { sumOfAnsweredByAnyone } = require('./day6');

readFile(__dirname, 'input.txt').then(rawText => {
    const sum = sumOfAnsweredByAnyone(rawText);
    console.log(sum);
});