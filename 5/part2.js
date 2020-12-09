const fs = require('fs');

function binaryPartitioner(minLetter, maxLetter) {
    return function binaryPartition({min, max}, letter) {
        const range = max - min + 1;
        return {
            min: (letter === minLetter ? min : min + range / 2),
            max: (letter === maxLetter ? max : max - range / 2),
        };
    }
}

function getBoardingPass(rawValue) {
    const partitions = [...rawValue];
    const row = partitions.slice(0, 7)
        .reduce(binaryPartitioner('F', 'B'), {min: 0, max: 127});
    const column = partitions.slice(7, 10)
        .reduce(binaryPartitioner('L', 'R'), {min: 0, max: 7});

    return {
        rawValue: rawValue,
        row: row.min,
        column: column.min
    };
}

function getSeatId({row, column}) {
    return row * 8 + column;
}

function getBoardingPasses(data) {
    return data.toString()
        .split(/\r?\n/)
        .map(getBoardingPass);
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allBoardingPasses = getBoardingPasses(data);
    const allSeatIds = allBoardingPasses
        .map(getSeatId)
        .sort((a, b) => a - b);

    const missing = allSeatIds.reduce((previous, next) => previous === next - 1 ? next : previous) + 1;

    console.log(missing);
});