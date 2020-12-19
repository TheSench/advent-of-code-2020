class State {
    constructor(instruction, accumulator) {
        this.instruction = instruction;
        this.accumulator = accumulator;
    }
}

function processAcc(currentState, value) {
    currentState.instruction++;
    currentState.accumulator += value;
}

function processJmp(currentState, value) {
    currentState.instruction += value;
}

function processNop(currentState) {
    currentState.instruction++;
}

module.exports = {
    State,
    processAcc,
    processJmp,
    processNop
};