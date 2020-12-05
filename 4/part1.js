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
    const numMissingFields = REQUIRED_FIELDS
        .filter(field => !passport.hasOwnProperty(field))
        .length;
    return !numMissingFields;
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allPassports = getPassports(data);
    const validPassports = allPassports.filter(isValid);
    console.log(validPassports.length);
});