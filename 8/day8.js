class State {
    visitedInstructions = new Set();

    constructor(instruction = 0, accumulator = 0) {
        this.instruction = instruction;
        this.accumulator = accumulator;
    }

    processAcc(value) {
        this.instruction++
        this.accumulator += value;
    }
    
    processJmp(value) {
        this.instruction += value;
    }
    
    processNop() {
        this.instruction++;
    }

    /**
     * 
     * @param {{instruction: String, value: Number}} operation 
     */
    processOperation({instruction, value}) {
        this.visitedInstructions.add(this.instruction);
        switch (instruction) {
            case 'acc':
                return this.processAcc(value);
            case 'jmp':
                return this.processJmp(value);
            case 'nop':
                return this.processNop(value);
        }
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