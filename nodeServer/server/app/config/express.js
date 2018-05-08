/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
<<<<<<< HEAD
const passport = require('passport');
=======
>>>>>>> e7c3695fcf75da7ee199b83eabac5b5340496a19

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
