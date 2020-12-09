const fs = require('fs');
const path = require('path');

function readFile(directory, filename) {
    const filepath = path.resolve(directory, filename);

    return new Promise((resolve, reject) => {
        fs.readFile(filepath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
}

module.exports = {
    readFile
};