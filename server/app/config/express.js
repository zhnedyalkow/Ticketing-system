/* globals __dirname */

const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

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

    const ensureToken = (req, res, next) => {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
        }

        next();
    };

    app.use(ensureToken, (req, res, next) => {
        jwt.verify(req.token,
            jwtOptions.secretOrKey, (err, userData) => {
                if (err) {
                    res.json({ err: 'Something went wrong. Try again later!' });
                } else {
                    req.userId = userData.id || '';
                }
            });

        next();
    });

    // decorator
    app.use('/static', express.static(path.join(__dirname, '../../public')));

    // decorator
    app.use(morgan('combined'));
};

module.exports = {
    init,
};
