const path = require('path');

const createEntries = () => {
    const jsonConfig = require('../../config/component/list.json');
    let entries = {};
    Object.keys(jsonConfig).forEach(key => {
        entries[key] = './src/' + jsonConfig[key];
    })
    return entries;
}

module.exports = {
    createEntries
}