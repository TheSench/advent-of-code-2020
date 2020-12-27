const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { splitIntoLines }  =require ('../utils/stringSplitters');
const { State, parseInstruction } = require('./day8');

describe('State', () => {
    describe('processAcc', () => {
        it.each([0, 3])('increases instruction by 1 (%i)', (currentInstruction) => {
            const state = new State(currentInstruction, 0);
            const expected = currentInstruction + 1;

            state.processAcc(0);

            expect(state.instruction).toBe(expected);
        });


        it.each([[3, 0], [4, 3], [5, -2], [-2, 7]])('adjusts accumulator by value (%i, %i)', (currentAccumulator, value) => {
            const state = new State(0, currentAccumulator);
            const expected = currentAccumulator + value;

            state.processAcc(value);

            expect(state.accumulator).toBe(expected);
        });
    });

    describe('processJmp', () => {
        it.each([[3, 0], [4, 3], [5, -2], [-2, 7]])('adjusts instruction by value ($i, $i)', (currentInstruction, value) => {
            const state = new State(currentInstruction, 0);
            const expected = currentInstruction + value;

            state.processJmp(value);

            expect(state.instruction).toBe(expected);
        });


        it('does not adjust accumulator', () => {
            const state = new State(0, 0);

            state.processJmp(5);

            expect(state.accumulator).toBe(0);
        });
    });

    describe('processNop', () => {
        it.each([[0, 3]])('increases instruction by 1 (%i)', (currentInstruction) => {
            const state = new State(currentInstruction, 0);
            const expected = currentInstruction + 1;

            state.processNop(0);

            expect(state.instruction).toBe(expected);
        });


        it('does not adjust accumulator', () => {
            const state = new State(0, 0);

            state.processNop(5);

            expect(state.accumulator).toBe(0);
        });
    });


    describe('processCommand', () => {
        /** @type State */
        let state = null;

        beforeEach(() => {
            state = new State();
            jest.spyOn(state, 'processAcc');
            jest.spyOn(state, 'processJmp');
            jest.spyOn(state, 'processNop');
        });
        
        it('processes acc commands', () => {
            const command = { command: 'acc', value: 1 };

            state.processCommand(command);

            expect(state.processAcc).toBeCalledWith(1);
            expect(state.processJmp).toHaveBeenCalledTimes(0);
            expect(state.processNop).toHaveBeenCalledTimes(0);
        });
        
        it('processes jmp commands', () => {
            const command = { command: 'jmp', value: 1 };

            state.processCommand(command);

            expect(state.processAcc).toHaveBeenCalledTimes(0);
            expect(state.processJmp).toBeCalledWith(1);
            expect(state.processNop).toHaveBeenCalledTimes(0);
        });
        
        it('processes nop commands', () => {
            const command = { command: 'nop', value: 1 };

            state.processCommand(command);

            expect(state.processAcc).toHaveBeenCalledTimes(0);
            expect(state.processJmp).toHaveBeenCalledTimes(0);
            expect(state.processNop).toBeCalledWith(1);
        });
        
        it.each([0, 2, 99])('marks the current command as visited (%i)', (current) => {
            state.instruction = current;
            
            expect(!state.visitedInstructions.has(current));

            state.processCommand({ command: 'nop', value: 1 });

            expect(state.visitedInstructions.has(current));
        });
    });    
});

describe('parseInstruction', () => {
    it.each(['acc', 'jmp', 'nop'])('retrieves %i command from line', (command) => {
        const instruction = parseInstruction(`${command} 0`);

        expect(instruction.command).toEqual(command);
    });

    it.each([
        ['+0', 0],
        ['+1', 1],
        ['+99', 99]
    ])('retrieves positive values ($i) from line', (rawValue, expectedValue) => {
        const instruction = parseInstruction(`nop ${rawValue} 0`);

        expect(instruction.value).toEqual(expectedValue);
    });

    it.each([
        ['-1', -1],
        ['-99', -99]
    ])('retrieves negative values ($i) from line', (rawValue, expectedValue) => {
        const instruction = parseInstruction(`nop ${rawValue}`);

        expect(instruction.value).toEqual(expectedValue);
    });
});

describe('findLoop', () => {
    it('gets correct answer from example', () => {
        const input = outdent`\
                      nop +0
                      acc +1
                      jmp +4
                      acc +3
                      jmp -3
                      acc -99
                      acc +1
                      jmp -4
                      acc +6`;
        const instructions = splitIntoLines(input).map(parseInstruction);
        const state = new State();
        
        const loop = state.findLoop(instructions);

        expect(loop).toBe(1);
        expect(state.accumulator).toBe(5);
    });
})
