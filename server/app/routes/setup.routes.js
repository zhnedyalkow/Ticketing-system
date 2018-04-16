/* globals __dirname __filename */

const fs = require('fs');
const path = require('path');

const init = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            const route = require(modulePath);
            route.init(app, data);
        });
};

/** dynamically load all routes */

module.exports = {
    init,
};