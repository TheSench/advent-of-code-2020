const { readFile } = require('../utils/fileUtils');
const { splitIntoLines } = require('../utils/stringSplitters')
const { findFirstInvalid } = require('./day8');

readFile(__dirname, 'input.txt').then(rawText => {
    const numbers = splitIntoLines(rawText)
        .map(Number);
    const first = findFirstInvalid(numbers, 25);
    console.log(first);
});