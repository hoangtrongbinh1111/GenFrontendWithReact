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
        .replace(/#moduleField#/g, moduleField);
}
function handleResult(file, error) {
    if (error) {
        console.log(error)
    } else {
        console.log('Generated: ' + file);
    }
}
function createResource(name, resourceField) {
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
    let moduleField = JSON.stringify(resourceField)
        .replace(/"name":/g, "name:")
        .replace(/"type":/g, "type:")
        .replace(/"label":/g, "label:")
        .replace(/"options":/g, "options:")
        .replace(/"label":/g, "label:")
        .replace(/"value":/g, "value:");
    console.log(moduleField);
    // end generate columns
    [
        {
            path: constructFilePathAction(initName.basePath, 'index', '.js'),
            template: 'src/template/index.js'
        },
        {
            path: constructFilePathAction(initName.basePath, 'edit', '.js'),
            template: 'src/template/edit.js'
        },
    ].forEach((fileData) => {
        const filePath = fileData.path;
        let data = '';
        if (fileData.template) {
            data = renderTemplate(fileData.template, name, moduleField);
        }
        fs.writeFile(filePath, data, (error) => { handleResult(filePath, error) });
    });
}
module.exports = { createResource };