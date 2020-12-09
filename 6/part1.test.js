const { describe, expect } = require('@jest/globals');
const { env } = require('process');
const { getGroups } = require('./part1');
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
})