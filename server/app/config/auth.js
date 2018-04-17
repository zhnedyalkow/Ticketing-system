const config = require('../config');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

const init = (app, data) => {
    passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
        console.log('payload received', jwt_payload);
        // usually this would be a database call:
        // let user = users[_.findIndex(users, { id: jwt_payload.id })];
        const user = await data.users.findById(jwt_payload.id);
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }));

    app.use(passport.initialize());
};

module.exports = {
    init,
};
