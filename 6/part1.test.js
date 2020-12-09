const { describe, expect } = require('@jest/globals');
const { env } = require('process');
const { getGroups, answersInGroup } = require('./part1');
const { EOL } = require('os');
const { outdent } = require('../utils/testUtils');

describe('getGroups', () => {
    it('splits groups by blank lines', () => {
        const input = outdent`\
                      abc
                      
                      def`;

        const groups = getGroups(input);

        expect(groups).toHaveLength(2);
    });

    it('creates response for each line', () => {
        const input = outdent`\
                      abc
                      def`;

        const groups = getGroups(input);

        expect(groups).toEqual([{
            responses: ['abc', 'def']
        }]);
    });

    it('handles multiple groups with multilpe responses', () => {
        const input = outdent`\
                      abc
                      d

                      def
                      
                      def
                      efg`;

        const groups = getGroups(input);

        expect(groups).toEqual([{
            responses: ['abc', 'd']
        }, {
            responses: ['def']
        }, {
            responses: ['def', 'efg']
        }]);
    });
});

describe('answersInGroup', () => {
    it('counts the letters in "abc"', () => {
        const group = {
            responses: ['abc']
        };

        const count = answersInGroup(group);

        expect(count).toBe(3);
    });

    it('counts the unique letters in "aab"', () => {
        const group = {
            responses: ['aab']
        };

        const count = answersInGroup(group);

        expect(count).toBe(2);
    });
});