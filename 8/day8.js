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
     * @param {{command: String, value: Number}} 
     */
    processCommand({command, value}) {
        this.visitedInstructions.add(this.instruction);
        switch (command) {
            case 'acc':
                return this.processAcc(value);
            case 'jmp':
                return this.processJmp(value);
            case 'nop':
                return this.processNop(value);
        }
    }

    findLoop(commands) {
        for (let i = 0; i < commands.length; i++) {
            const nextCommand = commands[this.instruction];
            this.processCommand(nextCommand);
            if (this.visitedInstructions.has(this.instruction)) {
                return this.instruction;
            }
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