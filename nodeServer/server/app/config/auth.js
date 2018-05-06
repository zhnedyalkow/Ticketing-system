const config = require('../config');

const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'teleTicket';

const init = (app, data) => {
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

    app.use(ensureToken, async (req, res, next) => {
        if (req.token !== '' && req.token !== 'null') {
            await jwt.verify(req.token,
                jwtOptions.secretOrKey, async (err, userData) => {
                    if (err) {
                        res.json({ err: `Invalid token!` });
                    } else {
                        const user = await data.users.getById(userData.id);
                        req.user = user;
                    }
                });
        }

        next();
    });
};

module.exports = {
    init,
};
