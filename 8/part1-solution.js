const { readFile } = require('../utils/fileUtils');
const { splitIntoLines } = require('../utils/stringSplitters')
const { State, parseInstruction } = require('./day8');

readFile(__dirname, 'input.txt').then(rawText => {
    const instructions = splitIntoLines(rawText)
        .map(parseInstruction);
    const state = new State();
    const loop = state.findLoop(instructions);
    console.log(loop);
    console.log(state.accumulator);
});