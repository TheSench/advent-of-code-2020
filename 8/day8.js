/**
 * 
 * @param {Number[]} list 
 * @param {Number} size 
 */
function getPreamble(list, size) {
    return list
        .filter((_, index) => index < size)
        .reduce((map, num) => {
            const currentCount = map.get(num) || 0;
            map.set(num, currentCount + 1);
            return map;
        }, new Map());
}

/**
 * 
 * @param {Map<Number, Number>} preamble 
 * @param {Number} num 
 */
function isValid(preamble, numToCheck) {
    const numsInPreamble = [...preamble.keys()];
    const numsSoFar = new Set();
    return numsInPreamble.some((nextNum) => {
        const numRemaining = numToCheck - nextNum;
        if (numsSoFar.has(numRemaining)) {
            return true;
        }
        numsSoFar.add(nextNum);
    });
}

module.exports = {
    getPreamble,
    isValid
};