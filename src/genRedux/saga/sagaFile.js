const stringOptions = require("../nameOptions");
const message = require("../output").message;
let fs = require("fs");
const prettier = require("prettier");
let result = [];
let types = [];
let functionsNames = [];
const generate = (name, arr) => {
  arr.forEach((el) => {
    let pref = el.type;
    let suf = stringOptions.toUpperFirst(el.suffex);
    let Name = stringOptions.toUpperFirst(name);
    if (!el.single) Name = stringOptions.withOutLastChar(Name);
    types.push(
      `${stringOptions.toUpper(pref)}_${stringOptions.toUpper(Name)}${suf ? "_" : ""
      }${stringOptions.toUpper(suf)}`
    );
    functionsNames.push({ name: `${pref}${Name}${suf}`, ...el });
    if (!el.pagination) {
      result.push(`${pref}${Name}${suf}Success`);
      result.push(`${pref}${Name}${suf}Error`);
    }

  });

  let dir = `./src/redux/sagas/${name}.js`;
  writeContent(dir, name);
};

const writeContent = (dir, name) => {
  try {
    let content = "";
    content += 'import { call, put, takeEvery } from "redux-saga/effects"\n';
    content += 'import axios from "axios"\n';
    content += "import {";
    for (let i = 0; i < result.length; i++) content += `${result[i]},`;
    content += `} from '../actions/${name}'\n`;
    content += "import {";
    for (let i = 0; i < types.length; i++) content += `${types[i]},`;
    content += `} from '../actionType/${name}'\n`;
    content += "import { getHeader } from '../services/api';\n\n";
    let resIdx = 0;
    for (let i = 0; i < functionsNames.length; i++) {
      let temp = "";
      if (functionsNames[i].method == "get" && !functionsNames[i].suffex) {
        temp += "let query = `limit=${data.limit}&page=${data.page}`;\n";
        temp += "if (data.search) {\n";
        temp += "query += `&search=${data.search}`;\n";
        temp += "}\n";
      }
      content += `const ${functionsNames[i].name}Async = async(data)=>{
          try{
            ${functionsNames[i].method == "get" && !functionsNames[i].suffex ? temp : ""}
             const response= await axios.${functionsNames[i].method
        }${getAxiosBody(functionsNames[i])};
             return response;
          }catch(error)
          {
              return error;
          }
      }\n\n`;
      content += `function* ${functionsNames[i].name} (action){
          let response=yield call(${functionsNames[i].name
        }Async,action.payload);
          if(response.status==200||response.status==201)
          {
            yield put(${result[resIdx]}(response.data))
          }
          else
          {
            yield put(${result[resIdx + 1]}(response.error.message))
          }
          if (action.callback) {
            action.callback(response.data);
          }
      }\n\n\n`;
      resIdx += 2;
    }

    content += `function* ${name}Saga() {
        
      `;
    for (let i = 0; i < types.length; i++) {
      content += `
        yield takeEvery(${types[i]},${functionsNames[i].name})
      `;
    }

    content += `}
     export default ${name}Saga`;
    content = prettier.format(content, { semi: false, parser: "babel" });
    fs.appendFileSync(dir, content);
    message("saga file content generated successfuly");
  } catch (err) {
    console.log(err);
  }
};

const getAxiosBody = (el) => {
  let hasToken = "`";
  let hasWithDataToken = "";
  if (el.isToken) {
    hasToken += ",{ headers: getHeader() }";
    hasWithDataToken += ",{ headers: getHeader() }";
  }
  if (el.method == "get" && !el.suffex) {
    return (
      "(`" + `${el.endpoint}?` + "${query}" + hasToken + ")"
    );
  }
  if (el.method == "get") return "(`" + `${el.endpoint}` + "${data.id}" + hasToken + ")";
  if (el.method == "post") return "(`" + `${el.endpoint}` + "`,{...data}" + hasWithDataToken + ")";
  if (el.method == "put")
    return "(`" + `${el.endpoint}` + "${data.id}" + "`,{...data}" + hasWithDataToken + ")";

  if (el.method == "delete")
    return "(`" + `${el.endpoint}` + "${data.id}" + hasToken + ")";
};

const combineIntoIndex = (listName) => {
  let storeDir = "./src/redux/sagas/index.js";
  let content = "import { all } from 'redux-saga/effects';\n";
  let exportName = "";
  listName.map(name => {
    content += `import ${name}Saga from './${name}';\n`;
    exportName += name + "Saga()" +",\n";
  });
  content += `export default function* rootSaga() {\n yield all([\n${exportName}])}`;

  fs.appendFileSync(storeDir, content);
}

module.exports = { generate, result, combineIntoIndex };
