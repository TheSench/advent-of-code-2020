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
})