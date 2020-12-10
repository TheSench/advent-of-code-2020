const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { parseRule } = require('./day7');

describe('parseRule', () => {
    it('parses a bag that contains no other bags', () => {
        const rule = parseRule('faded blue bags contain no other bags.');

        expect(rule).toEqual({
            type: 'faded blue',
            contents: []
        });
    });

    it('parses a bag that contains one other type of bag', () => {
        const rule = parseRule('bright white bags contain 1 shiny gold bag.');

        expect(rule).toEqual({
            type: 'bright white',
            contents: [{
                type: 'shiny gold',
                count: 1
            }]
        });
    });

    it('parses a bag that contains multiple types of bag', () => {
        const rule = parseRule('muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.');

        expect(rule).toEqual({
            type: 'muted yellow',
            contents: [{
                type: 'shiny gold',
                count: 2
            },{
                type: 'faded blue',
                count: 9
            }]
        });
    });

    it('handles plural and singular bags', () => {
        const rule = parseRule('shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.');

        expect(rule).toEqual({
            type: 'shiny gold',
            contents: [{
                type: 'dark olive',
                count: 1
            },{
                type: 'vibrant plum',
                count: 2
            }]
        });
    });
});