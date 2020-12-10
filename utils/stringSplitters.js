function splitByBlankLines(text) {
    return text.split(/\r?\n\r?\n/);
}

function splitIntoLines(text) {
    return text.split(/\r?\n/);
}

function splitByWhitespace(text) {
    return text.split(/\s+/);
}

module.exports = {
    splitByBlankLines,
    splitIntoLines,
    splitByWhitespace
};