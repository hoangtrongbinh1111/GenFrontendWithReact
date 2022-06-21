#! /usr/bin/env node
let cin = require("./src/genRedux/input").cin;

let scriptOutput = require("./src/genRedux/output");

const config = require('./src/genRedux/extractConfig');

const folders = require("./src/genRedux/createFolder");

const actionsTypes = require("./src/genRedux/actionType/actionTypeFile");

const action = require("./src/genRedux/action/actionFile");

const reducer = require("./src/genRedux/reducer/reducerFile");

const saga = require("./src/genRedux/saga/sagaFile");
scriptOutput.startScript();

folders.createMainFolders();

const configData = config.extractConfigJson();

const CRUD_name = configData.CRUD_Name;
const questions = configData.questions;

folders.createReduxFile(CRUD_name);

actionsTypes.generate(CRUD_name, questions);

action.generate(CRUD_name, questions);

reducer.generate(CRUD_name, questions);

saga.generate(CRUD_name, questions);

action.combineIntoIndex([CRUD_name]);

reducer.combineIntoIndex([CRUD_name]);

saga.combineIntoIndex([CRUD_name]);

// create template here
const resource = require("./src/genTemplate/index");
resource.createResource(CRUD_name, configData.fields);
//scriptOutput.endScript();
