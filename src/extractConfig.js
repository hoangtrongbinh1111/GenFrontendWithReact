var fs = require("fs");

const extractConfigJson = () => {
    let rawdata = fs.readFileSync('config.json');
    let configData = JSON.parse(rawdata);
    return configData;
};


module.exports = {
    extractConfigJson,
};
