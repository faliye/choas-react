const { exec } = require('child_process');
const path = require('path');

exec('npx webpack --config ' + path.resolve(__dirname, './webpack/common.js'), console.log);