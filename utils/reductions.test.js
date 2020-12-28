const { sum } = require('./reductions');

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
