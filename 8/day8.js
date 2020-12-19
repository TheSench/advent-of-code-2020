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

module.exports = {
    State
};