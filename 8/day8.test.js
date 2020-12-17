const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { getPreamble, isValid } = require('./day8');

describe('getPreamble', () => {
    it('returns a map of the first x numbers', () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const size = 5;

        const preamble = getPreamble(list, size);

        expect([...preamble.keys()]).toEqual([1, 2, 3, 4, 5]);
    });

    it('counts duplicates', () => {
        const list = [1, 2, 2, 4, 5, 6, 7, 8, 9, 10];
        const size = 5;

        const preamble = getPreamble(list, size);

        expect([...preamble.entries()]).toEqual([
            [1, 1],
            [2, 2],
            [4, 1],
            [5, 1]
        ]);
    });
});

describe('isValid', () => {
    it.each([6, 7, 8, 9])('returns true if number can be created from sum of two numbers in preamble ($num)', (num) => {
        const preamble = getPreamble([1, 2, 3, 4, 5], 5);

        const actualValid = isValid(preamble, num);

        expect(actualValid).toBe(true);
    });

    it.each([1, 2, 3, 4, 5, 11])('returns false if number cannot be created from sum of two numbers in preamble ($num)', (num) => {
        const preamble = getPreamble([1, 2, 3, 4, 5], 5);

        const actualValid = isValid(preamble, num);

        expect(actualValid).toBe(false);
    });

    it('returns false if number can only be created by two of the same number in the premble', () => {
        const preamble = getPreamble([1, 2, 3, 5, 5], 5);

        const actualValid = isValid(preamble, 10);

        expect(actualValid).toBe(false);
    });
});
