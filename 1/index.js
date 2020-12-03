const fs = require('fs');

const TARGET_SUM = 2020;

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const lines = data.toString()
        .split(/\r\n?/)
        .map(Number)
        .sort((a,b) => a - b);
    let low = 0, high = lines.length - 1;
    while (low < high) {
        const smallerNum = lines[low];
        while (low < high) {
            const largerNum = lines[high];
            const sum = smallerNum + largerNum;
            if (sum === TARGET_SUM) {
                console.log(smallerNum, largerNum, smallerNum * largerNum);
                return;
            } else if (sum < TARGET_SUM) {
                break;
            }
            high--;
        }
        low++;
    }
});