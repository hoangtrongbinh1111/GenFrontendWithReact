const fs = require('fs');

function copyTemplate(fileSource, fileDes) {
    fs.copyFile(fileSource, fileDes, (err) => {
        if (err)
            throw err;
    });
}

module.exports = {
    copyTemplate,
};
