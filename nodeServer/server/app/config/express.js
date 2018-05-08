/* globals __dirname */

const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const init = (app) => {
    // defensive programming
    if (typeof app.use !== 'function' ||
        typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    // decorator
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    // decorator
    app.use('/static', express.static(path.join(__dirname, '../../public')));

    // decorator
    app.use(morgan('combined'));
};

module.exports = {
    init,
};
