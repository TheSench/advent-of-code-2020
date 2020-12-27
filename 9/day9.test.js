const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { getPreamble, isValid, findFirstInvalid, findContiguousRangeWithSum, getExtremes } = require('./day9');

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
    it.each([3, 4, 5, 6, 7, 8, 9])('returns true if number can be created from sum of two numbers in preamble (%i)', (num) => {
        const preamble = getPreamble([1, 2, 3, 4, 5], 5);

        const actualValid = isValid(preamble, num);

        expect(actualValid).toBe(true);
    });

    it.each([1, 2, 11])('returns false if number cannot be created from sum of two numbers in preamble (%i)', (num) => {
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

describe('firstInvalid', () => {
    it('returns correct answer from example', () => {
        const nums = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];

        const firstInvalid = findFirstInvalid(nums, 5);

        expect(firstInvalid).toBe(127);
     });
});

describe('findContiguousRangeWithSum', () => {
    it('returns correct range from example', () => {
        const nums = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];
        const targetSum = 127;

        const range = findContiguousRangeWithSum(nums, targetSum);

        expect(range).toEqual([15, 25, 47, 40]);
    });
});

describe('getExtremes', () => {
    it('returns correct min and max from example', () => {
        const numbers = [15, 25, 47, 40];

        const extremes = getExtremes(numbers);

        expect(extremes).toEqual({
            min: 15,
            max: 47
        });
    });
});
