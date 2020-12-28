/**
 * Adds two numbers together.
 * @param {Number} a 
 * @param {Number} b 
 */
function sum(a, b) {
    return a + b;
}

/**
 * Count the number of occurrences of each element in the list.
 * @param {Array} list 
 */
function countOccurrences(list) {
    return list.reduce((map, next) => {
        if (!map[next]) map[next] = 0;
        map[next]++;
        return map;
    }, {});
};

module.exports = {
    sum,
    countOccurrences
};