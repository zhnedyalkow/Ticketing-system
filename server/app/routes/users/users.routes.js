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
                return res.json({ err: error.message });
            }

            return res.json(result);
        });

    app.use('/user', router);
};

module.exports = {
    init,
};
