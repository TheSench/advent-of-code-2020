const { readFile } = require('../utils/fileUtils');
const { getInputSum } = require('./day6');

readFile(__dirname, 'input.txt').then(rawText => {
    const sum = getInputSum(rawText);
    console.log(sum);
});