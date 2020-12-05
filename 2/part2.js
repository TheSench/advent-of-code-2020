const fs = require('fs');

const PASSWORD_REGEX = /(?<first>\d+)-(?<second>\d+)\s+(?<letter>[a-z]):\s+(?<password>[a-z]+)/i
function getPasswordData(data) {
    return data.toString()
        .split(/\r\n?/)
        .map(line => line.match(PASSWORD_REGEX).groups)
        .map(groups => ({
            first: Number(groups.first) - 1,
            second: Number(groups.second) - 1,
            letter: groups.letter,
            password: groups.password
        }));
}

function isValid(passwordDatum) {
    const { password, letter } = passwordDatum;
    const firstHasLetter = (password[passwordDatum.first] === letter);
    const secondHasLetter = (password[passwordDatum.second] === letter);
    return (firstHasLetter !== secondHasLetter);
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allPasswordData = getPasswordData(data);
    const validPasswords = allPasswordData.filter(isValid);
    console.log(validPasswords.length);
});