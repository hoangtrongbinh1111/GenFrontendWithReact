const fs = require('fs');

// Functions
const toUpperFirst = (name) => {
    name = name ? name : "";
    return name.charAt(0).toUpperCase() + name.slice(1);
};
const initResource = (CRUD_name) => {
    const singularUpperFirst = toUpperFirst(CRUD_name);
    const plural = CRUD_name;
    const basePath = 'src/pages/' + plural.toLowerCase() + '/';
    return {
        singularUpperFirst: singularUpperFirst,
        plural: plural,
        basePath: basePath
    }
}
function constructFilePathAction(basePath, file, extension) {
    return [basePath, file, extension].join('');
}
function renderTemplate(file, name, moduleField) {
    const initName = initResource(name);
    return fs.readFileSync(file, 'utf8')
        .replace(/#resource#/g, name)
        .replace(/#resourceLower#/g, name.toLowerCase())
        .replace(/#resourceUpperFirst#/g, initName.singularUpperFirst)
        .replace(/#plural#/g, initName.plural)
        .replace(/#pluralLower#/g, initName.plural.toLowerCase())
        .replace(/#moduleField#/g, moduleField)
        .replace(/#moduleFieldAdd#/g, moduleField)
        .replace(/#moduleFieldEdit#/g, moduleField);
}
function handleResult(file, error) {
    if (error) {
        console.log(error)
    } else {
        console.log('Generated: ' + file);
    }
}
function standardTemplate(fields) {
    return JSON.stringify(fields)
        .replace(/"name":/g, "name:")
        .replace(/"type":/g, "type:")
        .replace(/"label":/g, "label:")
        .replace(/"options":/g, "options:")
        .replace(/"label":/g, "label:")
        .replace(/"value":/g, "value:")
        .replace(/"key":/g, "key:")
        .replace(/"rules":/g, "rules:")
        .replace(/"message":/g, "message:")
        .replace(/"required":/g, "required:")
        .replace(/"min":/g, "min:")
        .replace(/"disabled":/g, "disabled:");
}
function createResource(name, resource) {
    const initName = initResource(name);
    [
        'src/',
        'src/pages/',
        initName.basePath,
    ].forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log('Generated: ' + dir);
        }
    });

    // generate columns
    let moduleField = standardTemplate(resource.fields);
    let moduleField_Add = standardTemplate(resource.fields_Add);
    let moduleField_Edit = standardTemplate(resource.fields_Edit);
    // end generate columns

    const filePath = constructFilePathAction(initName.basePath, 'index', '.js');
    const template = 'src/template/index.js';
    const data = fs.readFileSync(template, 'utf8')
        .replace(/#resource#/g, name)
        .replace(/#resourceLower#/g, name.toLowerCase())
        .replace(/#resourceUpperFirst#/g, initName.singularUpperFirst)
        .replace(/#plural#/g, initName.plural)
        .replace(/#pluralLower#/g, initName.plural.toLowerCase())
        .replace(/#moduleField#/g, moduleField)
        .replace(/#moduleFieldAdd#/g, moduleField_Add)
        .replace(/#moduleFieldEdit#/g, moduleField_Edit);
    fs.writeFile(filePath, data, (error) => { handleResult(filePath, error) });
}
module.exports = { createResource };