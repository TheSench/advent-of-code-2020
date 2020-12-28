const { sum, countOccurrences } = require('./reductions');

describe('sum', () => {
    it.each([
        [1, 2, 3],
        [3, 2, 5],
        [4, -2, 2]
    ])('adds %i and %i together to get %i', (a, b, total) => {
        expect(sum(a, b)).toBe(total);
    });

    it('ignores index when used as a reduction', () => {
        const total = [1, 1, 1, 1].reduce(sum);
        expect(total).toBe(4);
    });
});

describe('countOccurrences', () => {
    it('returns 1 for each unique number', () => {
        const numbers = [1, 2, 3, 4, 5];

        const occurrences = countOccurrences(numbers);

        expect(occurrences).toEqual({
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1
        });
    });

    it('counts duplicates', () => {
        const numbers = [1, 1, 2, 3, 4, 4, 5];

        const occurrences = countOccurrences(numbers);

        expect(occurrences).toEqual({
            1: 2,
            2: 1,
            3: 1,
            4: 2,
            5: 1
        });
    });

    it('accepts strings', () => {
        const numbers = ['a', 'a', 'b', 'c', 'd', 'e'];

        const occurrences = countOccurrences(numbers);

        expect(occurrences).toEqual({
            a: 2,
            b: 1,
            c: 1,
            d: 1,
            e: 1
        });
    });
});
