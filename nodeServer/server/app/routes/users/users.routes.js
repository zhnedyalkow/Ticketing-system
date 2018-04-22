const {
    Router,
} = require('express');

const UserController = require('./users.controller');

// * TODO
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';
// * TODO END

const init = (app, data) => {
    const router = new Router();
    const controller = new UserController(data);

    router
        .post('/register', async (req, res) => {
            const registerInfo = req.body;
            let result;

            try {
                result = await controller.register(registerInfo);
            } catch (error) {
                return res.json({ err: error.message });
            }

            return res.json(result);
        })
        .post('/login', async (req, res, next) => {
            let email;
            let password;

            if (req.body.email && req.body.password) {
                email = req.body.email;
                password = req.body.password;
            }

            // Get the user from database
            const user = await controller.getUserByEmail(email);
            if (!user) {
                res.json({ message: 'No such user found' });
            }

            if (user.password === password) {
                const payload = { id: user.id };
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.status(200)
                    .json({ message: 'ok', token: token });
                next();
            } else {
                res.status(200).json({ message: 'passwords did not match' });
                next();
            }
        })
        .get('/test', async (req, res) => {
            if (typeof req.userId === 'undefined') {
                return res.sendStatus(403);
            }

            const user = await data.users.getById(req.userId);
            return res.json(user);
        });

    app.use('/user', router);
};

module.exports = {
    init,
};
