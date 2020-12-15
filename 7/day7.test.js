const { describe, expect } = require('@jest/globals');
const { outdent } = require('../utils/testUtils');
const { parseRule, parseRules } = require('./day7');

describe('parseRule', () => {
    it('parses a bag that contains no other bags', () => {
        const rule = parseRule('faded blue bags contain no other bags.');

        expect(rule).toEqual({
            'faded blue': {}
        });
    });

    it('parses a bag that contains one other type of bag', () => {
        const rule = parseRule('bright white bags contain 1 shiny gold bag.');

        expect(rule).toEqual({
            'bright white': {
                'shiny gold': 1
            }
        });
    });

    it('parses a bag that contains multiple types of bag', () => {
        const rule = parseRule('muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.');

        expect(rule).toEqual({
            'muted yellow': {
                'shiny gold': 2,
                'faded blue': 9
            }
        });
    });

    it('handles plural and singular bags', () => {
        const rule = parseRule('shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.');

        expect(rule).toEqual({
            'shiny gold': {
                'dark olive': 1,
                'vibrant plum': 2
            }
        });
    });
});

describe('parseRules', () => {
    it('returns a map of rules', () => {
        const input = outdent`\
                      shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
                      dark orange bags contain 3 bright white bags, 4 muted yellow bags.`;

        const rules = parseRules(input);

        expect(rules).toEqual({
            'shiny gold': {
                'dark olive': 1,
                'vibrant plum': 2
            },
            'dark orange': {
                'bright white': 3,
                'muted yellow': 4
            }
        });
    });
});