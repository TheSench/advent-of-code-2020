const fs = require('fs');


function getRows(data) {
    return data.toString()
        .split(/\r?\n/)
        .map(line => [...line].map(char => char === '#'));
}

function getTrees(rows, dx, dy) {
    let numTrees = 0;
    let patternSize = rows[0].length;
    for(let x = 0, y = 0; y < rows.length; y += dy) {
        const row = rows[y];
        if(row[x]) {
            numTrees++;
        }
        x = (x + dx) % patternSize;
    }
    return numTrees;
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allRows = getRows(data);
    const numTrees = getTrees(allRows, 3, 1);
    console.log(numTrees);
});