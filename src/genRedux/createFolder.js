var fs = require("fs");
const message = require("./output").message;
const copyTemplate = require("../template/utils").copyTemplate;
const listDir = [
  "actions", "actionType", "reducers", "sagas"
];
const srcDir = "./src/redux";
const createMainFolders = () => {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }
  copyTemplate("./src/template/store.js",srcDir + "/store.js");
  listDir.forEach((fileData) => {
    let storeDir = srcDir + "/" + fileData;
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir);
    }
    fs.writeFile(`${storeDir}/index.js`, "", function (err) {
      if (err) throw err;
    });
  });
  if (!fs.existsSync(srcDir + "/services")) {
    fs.mkdirSync(srcDir + "/services");
  }
  copyTemplate("./src/template/api.js",srcDir + "/services/api.js");
};

const createReduxFile = (name) => {
  listDir.forEach((fileData) => {
    let storeDir = srcDir + "/" + fileData;
    fs.writeFile(`${storeDir}/${name}.js`, "", function (err) {
      if (err) throw err;
    });
  });
  message("CRUD files created successfully");
};

module.exports = {
  createMainFolders,
  createReduxFile,
};
