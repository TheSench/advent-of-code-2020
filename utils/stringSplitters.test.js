const { describe, expect } = require('@jest/globals');
const { outdent } = require('./testUtils');
const { splitByBlankLines, splitIntoLines, splitByWhitespace } = require('./stringSplitters');

describe('splitByBlankLines', () => {
    it('given two lines separated by a blank line, returns an array of those two lines', () => {
        const text = outdent`\
                     abc

                     def`;

        const result = splitByBlankLines(text);

        expect(result).toEqual(['abc', 'def']);
    });

    it('leaves lines together when not separated by a blank line', () => {
        const text = outdent`\
                     abc
                     def`;

        const result = splitByBlankLines(text);

        expect(result).toEqual([text]);
    });

    it('handles mix of grouped lines and separated lines', () => {
        const text = outdent`\
                     abc
                     def
                     
                     ghi`;

        const result = splitByBlankLines(text);

        const first = outdent`\
                     abc
                     def`;
        const second = 'ghi';
        expect(result).toEqual([first, second]);
    });
});

describe('splitIntoLines', () => {
    it('given two separate lines, returns an array of those two lines', () => {
        const text = outdent`\
                     abc
                     def`;

        const result = splitIntoLines(text);

        expect(result).toEqual(['abc', 'def']);
    });
});

describe('splitByWhitespace', () => {
    it('given two words separated by space, returns an array of those two words', () => {
        const text = 'abc def';

        const result = splitByWhitespace(text);

        expect(result).toEqual(['abc', 'def']);
    });

    it('given two separate lines, returns an array of those two lines', () => {
        const text = outdent`\
                     abc
                     def`;

        const result = splitByWhitespace(text);

        expect(result).toEqual(['abc', 'def']);
    });

    it('given three words separated by a mix of newlines and spaces, returns an array of those three words', () => {
        const text = outdent`\
                     abc def
                     ghi`;

        const result = splitByWhitespace(text);

        expect(result).toEqual(['abc', 'def', 'ghi']);
    });
});