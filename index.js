#! /usr/bin/env node
let cin = require("./src/genRedux/input").cin;

let scriptOutput = require("./src/genRedux/output");

const config = require('./src/genRedux/extractConfig');

const folders = require("./src/genRedux/createFolder");

const actionsTypes = require("./src/genRedux/actionType/actionTypeFile");

const action = require("./src/genRedux/action/actionFile");

const reducer = require("./src/genRedux/reducer/reducerFile");

const saga = require("./src/genRedux/saga/sagaFile");

const resource = require("./src/genTemplate/index");

scriptOutput.startScript();

folders.createMainFolders();

const configData = config.extractConfigJson();
let crud_arr = [];
configData.map((item) => {
    const CRUD_name = item.CRUD_Name;
    const questions = item.questions;
    
    folders.createReduxFile(CRUD_name);
    
    let listActionTypes = actionsTypes.generate(CRUD_name, questions);
    
    action.generate(CRUD_name, questions, listActionTypes);
    
    reducer.generate(CRUD_name, listActionTypes);
    
    saga.generate(CRUD_name, questions);

    resource.createResource(CRUD_name, item);

    crud_arr.push(CRUD_name);
});

// Combine Index.js
action.combineIntoIndex(crud_arr);

reducer.combineIntoIndex(crud_arr);

saga.combineIntoIndex(crud_arr);

