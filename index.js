#! /usr/bin/env node
let cin = require("./src/input").cin;

let scriptOutput = require("./src/output");

const config = require('./src/extractConfig');

const folders = require("./src/createFolder");

const actionsTypes = require("./src/actionType/actionTypeFile");

const action = require("./src/action/actionFile");

const reducer = require("./src/reducer/reducerFile");

const saga = require("./src/saga/sagaFile");
scriptOutput.startScript();

folders.createMainFolders();

const configData = config.extractConfigJson();

const CRUD_name = configData.CRUD_Name;
const questions = configData.questions;

folders.createReduxFolder(CRUD_name);

actionsTypes.generate(CRUD_name, questions);

action.generate(CRUD_name, questions);

reducer.generate(CRUD_name, questions);

saga.generate(CRUD_name, questions);

//scriptOutput.endScript();
