var fs = require("fs");
const listDir = [
    "actions", "actionType", "reducers", "sagas"
];
const combineIntoIndex = (name) => {
    listDir.forEach((fileData) => {
        let storeDir = "./src/redux/" + fileData + "/index.js";
        let content = "";
        
        fs.appendFileSync(dir, content);
      });
}

module.exports = {
    combineIntoIndex,
};
