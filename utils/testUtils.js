/**
 * Tag for use with template literals
 *
 * Finds the indentation on the first line after the opening backtick
 * and removes that indentation from every line in the template.
 * @param {String[]} strings Array of lines in the template literal
 */
function outdent(strings) {
    // Add in all of the expressions
    let outdented = strings
        .map((s, i) => `${s}${arguments[i + 1] || ''}`)
        .join('')
    // Find the indentation after the first newline
    const matches = /^\s+/.exec(outdented.split('\n')[1])
    if (matches) {
        const outdentRegex = new RegExp('\\n' + matches[0], 'g')
        outdented = outdented.replace(outdentRegex, '\n')
    }
    return outdented
}

module.exports = {
    outdent
};