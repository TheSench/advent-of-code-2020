/**
 * 
 * @param {Map<Number, Number>} preamble 
 * @param {Number} num 
 */
function addToPreamble(preamble, num) {
    const newCount = (preamble.get(num) || 0) + 1;
    preamble.set(num, newCount);
    return preamble;
}

/**
 * 
 * @param {Map<Number, Number>} preamble 
 * @param {Number} num 
 */
function removeFromPreamble(preamble, num) {
    const newCount = (preamble.get(num) || 0) - 1;
    if (newCount) {
        preamble.set(num, newCount);
    } else {
        preamble.delete(num);
    }
    return preamble;
}

/**
 * 
 * @param {Number[]} list 
 * @param {Number} size 
 */
function getPreamble(list, size) {
    return list
        .filter((_, index) => index < size)
        .reduce(addToPreamble, new Map());
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

/**
 * 
 * @param {Number[]} list 
 * @param {Number} preambleSize 
 */
function findFirstInvalid(list, preambleSize) {
    if (list.length <= preambleSize) {
        return undefined;
    }

    const preamble = getPreamble(list, preambleSize);
    for (let preambleStartCursor = 0, numCursor = preambleSize; numCursor < list.length; preambleStartCursor++, numCursor++) {
        const nextNum = list[numCursor];
        if (!isValid(preamble, nextNum)) {
            return nextNum;
        }
        addToPreamble(preamble, nextNum);
        const numToEvict = list[preambleStartCursor];
        removeFromPreamble(preamble, numToEvict);
    }
}

module.exports = {
    getPreamble,
    isValid,
    findFirstInvalid
};