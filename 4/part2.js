const fs = require('fs');

const REQUIRED_FIELDS = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
];

const VALIDATORS = {
    byr: rangeValidation(1920, 2002),
    iyr: rangeValidation(2010, 2020),
    eyr: rangeValidation(2020, 2030),
    hgt: heighValidator,
    hcl: regexValidation(/^#[0-9a-f]{6}$/),
    ecl: regexValidation(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
    pid: regexValidation(/^\d{9}$/)
}

function rangeValidation(min, max) {
    return function rangeValidator(value) {
        const num = Number(value);
        return (min <= num && num <= max);
    }
}

function regexValidation(regex) {
    return function regexValidator(value) {
        return regex.test(value);
    }
}

const HEIGHT_REGEX = /^(?<value>\d+)(?<unit>cm|in)$/;
const CM_VALIDATOR = rangeValidation(150, 193);
const IN_VALIDATOR = rangeValidation(59, 76);
function heighValidator(value) {
    if (!value) {
        return false;
    }

    const match = value.match(HEIGHT_REGEX);
    if(!match) {
        return false;
    }

    switch(match.groups.unit) {
        case 'in':
            return IN_VALIDATOR(match.groups.value);
        case 'cm':
            return CM_VALIDATOR(match.groups.value);
    }
}

function getPassports(data) {
    return data.toString()
        .split(/\r\n?|\s/)
        .reduce((passports, nextRawField) => {
            if (!nextRawField) {
                passports.push({});
            } else {
                const lastPassport = passports[passports.length - 1];
                const field = nextRawField.split(':', 2);
                lastPassport[field[0]] = field[1];
            }
            return passports;
        }, [{}]);
}

function isValid(passport) {
    const numInvalidFields = REQUIRED_FIELDS
        .filter(field => {
            const value = passport[field];
            const isValid = VALIDATORS[field];
            return !isValid(value);
        })
        .length;
    return !numInvalidFields;
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allPassports = getPassports(data);
    const validPassports = allPassports.filter(isValid);
    console.log(validPassports.length);
});