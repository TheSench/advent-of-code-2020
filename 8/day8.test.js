const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { State } = require('./day8');

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
});
