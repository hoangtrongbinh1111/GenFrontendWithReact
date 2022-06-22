const stringOptions = require("../nameOptions");
const message = require("../output").message;
let fs = require("fs");
const prettier = require("prettier");
const generate = (name, arr) => {
  let result = [];
  arr.forEach((el) => {
    let pref = stringOptions.toUpper(el.type);
    let suf = stringOptions.toUpper(el.suffex);
    let Name = stringOptions.toUpper(name);
    if (!el.single) Name = stringOptions.withOutLastChar(Name);
    result.push(`${pref}_${Name}${suf ? "_" : ""}${suf}`);
    if (!el.pagination) {
      result.push(`${pref}_${Name}${suf ? "_" : ""}${suf}_SUCCESS`);
      result.push(`${pref}_${Name}${suf ? "_" : ""}${suf}_ERROR`);
    }
  });
  let dir = `./src/redux/actionType/${name}.js`;
  writeContent(dir, result);
  return result;
};

const writeContent = (dir, result) => {
  try {
    let content = "";
    for (let i = 0; i < result.length; i++)
      content += "export const " + result[i] + "=" + `"${result[i]}"\n\n`;
    content += `export const CHANGE_LIMIT='CHANGE_LIMIT'\n\n`
    content += `export const CHANGE_SKIP='CHANGE_SKIP'\n\n`
    content += `export const CHANGE_PAGE='CHANGE_PAGE'\n\n`

    content = prettier.format(content, { semi: false, parser: "babel" });
    fs.appendFileSync(dir, content);
    message("action types file content generated successfuly");
  } catch (err) {
    console.log(err);
  }
};
module.exports = { generate };
