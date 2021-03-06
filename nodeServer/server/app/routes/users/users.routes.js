const {
    Router,
} = require('express');

const UserController = require('./users.controller');

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
                return res.status(302)
                    .json({ err: error.message });
            }

            return res.status(200)
                .json(result);
        })
        .post('/login', async (req, res, next) => {
            let info;
            let email;
            let password;

            if (req.body.email && req.body.password) {
                email = req.body.email;
                password = req.body.password;
            }

            try {
                info = await controller.login({ email, password });
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(info);
        })
        .get('/getInfo', async (req, res) => {
            if (typeof req.user === 'undefined') {
                return res.sendStatus(403);
            }

            req.user.password = null;

            return res.json(req.user);
        })
        .post('/addUserToCompany', async (req, res) => {
            let result;

            try {
                result = await controller
                    .addUserToCompany(req.body.email, req.user);
            } catch (error) {
                return res.status(301).json({ err: error.message });
            }

            return res.status(200).json(result);
        })
        .post('/addUsersToTeam', async (req, res) => {
            let result;

            try {
                result = await controller
                    .addUsersToTeam(req.body.users,
                        req.body.teamName, req.user);
            } catch (error) {
                return res.status(301).json({ err: error.message });
            }

            return res.status(200).json(result);
        })
        .get('/getAllUsers', async (req, res) => {
            let result;

            try {
                result = await controller.getAllUsers(req.user);
            } catch (error) {
                return res.status(301).json({ err: error.message });
            }

            return res.status(200).json(result);
        })
        .get('/getAllUsersOfTeam', async (req, res) => {
            const nameOftheTeam = req.query.team;
            let result;

            try {
                result = await controller
                    .getAllUserOfTeam(nameOftheTeam, req.user);
            } catch (error) {
                return res.status(302)
                    .json({ err: error.message });
            }

            return res.status(200).json(result);
        });

    app.use('/user', router);
};

module.exports = {
    init,
};
