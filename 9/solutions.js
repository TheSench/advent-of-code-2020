const { readFile } = require('../utils/fileUtils');
const { splitIntoLines } = require('../utils/stringSplitters')
const { findFirstInvalid, findContiguousRangeWithSum, getExtremes } = require('./day9');

readFile(__dirname, 'input.txt').then(rawText => {
    const numbers = splitIntoLines(rawText)
        .map(Number);
    const firstInvalid = findFirstInvalid(numbers, 25);
    console.log(firstInvalid);

    const contiguousRange = findContiguousRangeWithSum(numbers, firstInvalid);
    const extremes = getExtremes(contiguousRange);
    const sum = extremes.min + extremes.max;
    console.log(sum);
});