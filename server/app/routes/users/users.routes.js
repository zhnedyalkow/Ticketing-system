const {
    Router,
} = require('express');

const UserController = require('./users.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new UserController(data);

    router
        .post('/register', async (req, res) => {
            const registerInfo = req;
            const result = await controller.register(registerInfo);
            res.json(registerInfo);
        });

    app.use('/user', router);
};

module.exports = {
    init,
};
