const fs = require('fs');

const PASSWORD_REGEX = /(?<min>\d+)-(?<max>\d+)\s+(?<letter>[a-z]):\s+(?<password>[a-z]+)/i
function getPasswordData(data) {
    return data.toString()
        .split(/\r?\n/)
        .map(line => line.match(PASSWORD_REGEX).groups)
        .map(groups => ({
            min: Number(groups.min),
            max: Number(groups.max),
            letter: groups.letter,
            password: groups.password
        }));
}

function isValid(passwordDatum) {
    const letterCount = [...passwordDatum.password]
        .filter(char => char === passwordDatum.letter)
        .length;
    return (passwordDatum.min <= letterCount && letterCount <= passwordDatum.max);
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allPasswordData = getPasswordData(data);
    const validPasswords = allPasswordData.filter(isValid);
    console.log(validPasswords.length);
});