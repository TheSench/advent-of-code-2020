const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { State, parseInstruction } = require('./day8');

describe('State', () => {
    describe('processAcc', () => {
        it.each([0, 3])('increases instruction by 1 ($instruction)', (currentInstruction) => {
            const state = new State(currentInstruction, 0);
            const expected = currentInstruction + 1;

            state.processAcc(0);

            expect(state.instruction).toBe(expected);
        });


        it.each([[3, 0], [4, 3], [5, -2], [-2, 7]])('adjusts accumulator by value', (currentAccumulator, value) => {
            const state = new State(0, currentAccumulator);
            const expected = currentAccumulator + value;

            state.processAcc(value);

            expect(state.accumulator).toBe(expected);
        });
    });

    describe('processJmp', () => {
        it.each([[3, 0], [4, 3], [5, -2], [-2, 7]])('adjusts instruction by value', (currentInstruction, value) => {
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
        it.each([[0, 3]])('increases instruction by 1 ($instruction)', (currentInstruction) => {
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


    describe('processOperation', () => {
        let state = null;

        beforeEach(() => {
            state = new State();
            jest.spyOn(state, 'processAcc');
            jest.spyOn(state, 'processJmp');
            jest.spyOn(state, 'processNop');
        });
        
        it('processes acc operations', () => {
            const operation = { instruction: 'acc', value: 1 };
            state.processOperation(operation);

            expect(state.processAcc).toBeCalledWith(1);
            expect(state.processJmp).toHaveBeenCalledTimes(0);
            expect(state.processNop).toHaveBeenCalledTimes(0);
        });
        
        it('processes jmp operations', () => {
            const operation = { instruction: 'jmp', value: 1 };
            state.processOperation(operation);

            expect(state.processAcc).toHaveBeenCalledTimes(0);
            expect(state.processJmp).toBeCalledWith(1);
            expect(state.processNop).toHaveBeenCalledTimes(0);
        });
        
        it('processes nop operations', () => {
            const operation = { instruction: 'nop', value: 1 };
            state.processOperation(operation);

            expect(state.processAcc).toHaveBeenCalledTimes(0);
            expect(state.processJmp).toHaveBeenCalledTimes(0);
            expect(state.processNop).toBeCalledWith(1);
        });
    });    
});

describe('parseInstruction', () => {
    it.each(['acc', 'jmp', 'nop'])('retrieves $command command from line', (command) => {
        const instruction = parseInstruction(`${command} 0`);

        expect(instruction.command).toEqual(command);
    });

    it.each([
        ['+0', 0],
        ['+1', 1],
        ['+99', 99]
    ])('retrieves positive values ($rawValue) from line', (rawValue, expectedValue) => {
        const instruction = parseInstruction(`nop ${rawValue} 0`);

        expect(instruction.value).toEqual(expectedValue);
    });

    it.each([
        ['-1', -1],
        ['-99', -99]
    ])('retrieves negative values ($rawValue) from line', (rawValue, expectedValue) => {
        const instruction = parseInstruction(`nop ${rawValue}`);

        expect(instruction.value).toEqual(expectedValue);
    });
});
