class State {
    constructor(instruction, accumulator) {
        this.instruction = instruction;
        this.accumulator = accumulator;
    }

    processAcc(value) {
        this.instruction++;
        this.accumulator += value;
    }
    
    processJmp(value) {
        this.instruction += value;
    }
    
    processNop() {
        this.instruction++;
    }
}

function parseInstruction(line) {
    const [command, value] = line.split(/\s+/);
    return {
        command,
        value: Number(value)
     };
}

module.exports = {
    State,
    parseInstruction
};