const config = require('../config');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'tasmanianDevil';

const init = (app, data) => {
    // passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    //     console.log('payload received', jwt_payload);
    //     const user = await data.users.findById(jwt_payload.id);
    //     if (user) {
    //         next(null, user);
    //     } else {
    //         next(null, false);
    //     }
    // }));

    const ensureToken = (req, res, next) => {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
        } else {
            req.token = '';
        }

        next();
    };

    app.use(ensureToken, (req, res, next) => {
        if (req.token !== '' && req.token !== 'null') {
            jwt.verify(req.token,
                jwtOptions.secretOrKey, (err, userData) => {
                    if (err) {
                        res.json({ err: `Invalid token!` });
                    } else {
                        req.userId = userData.id || '';
                    }
                });
        }

        next();
    });

    // app.use(passport.initialize());
};

module.exports = {
    init,
};
