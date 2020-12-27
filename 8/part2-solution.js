const { readFile } = require('../utils/fileUtils');
const { splitIntoLines } = require('../utils/stringSplitters')
const { State, parseInstruction, fixInstructions } = require('./day8');



readFile(__dirname, 'input.txt').then(rawText => {
    const instructions = splitIntoLines(rawText)
        .map(parseInstruction);
    const fixed = fixInstructions(instructions);
    console.log(fixed);
});