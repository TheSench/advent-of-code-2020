const { describe, expect } = require('@jest/globals');
const { env } = require('process');
const { getGroups, answersInGroup, getInputSum } = require('./part1');
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
    
    it('calculates correct number of groups from README example', () => {
        const input = outdent`\
                      abc
                      
                      a
                      b
                      c
                      
                      ab
                      ac
                      
                      a
                      a
                      a
                      a
                      
                      b`;

        const groups = getGroups(input);

        expect(groups).toHaveLength(5);
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
    
    it('calculates correct counts from README example', () => {
        const input = outdent`\
                      abc
                      
                      a
                      b
                      c
                      
                      ab
                      ac
                      
                      a
                      a
                      a
                      a
                      
                      b`;

        const counts = getGroups(input)
        .map(group => answersInGroup(group));

        expect(counts).toEqual([3, 3, 3, 1, 1]);
    });
});

describe('getInputSum', () => {
    it('calculates correct sum from README example', () => {
        const input = outdent`\
                      abc
                      
                      a
                      b
                      c
                      
                      ab
                      ac
                      
                      a
                      a
                      a
                      a
                      
                      b`;

        const sum = getInputSum(input);

        expect(sum).toBe(11);
    });
});