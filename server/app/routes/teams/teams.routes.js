const {
    Router,
} = require('express');

// required initially init function in order to run express server

const TeamsController = require('./teams.controller');

const init = (app, data) => {
    const controller = new TeamsController(data);
    const router = new Router();
    app.use('/Team', router);

    router
        .get('/getMyTeams', async (req, res) => {
            const userId= req.query.userId;

            const teamList = await controller
                .getMyTeamsByUserId(userId);

            res.json(teamList);
        });
};

module.exports = {
    init,
};
