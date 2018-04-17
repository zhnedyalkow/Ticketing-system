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
            const userId = req.query.userId;

            const teamList = await controller
                .getMyTeamsByUserId(userId);

            res.json(teamList);
        })
        .get('/getAllTeams', async (req, res) => {
            const companyId = req.query.companyId;

            const allTeams = await controller
                .getAllTeamsByCompanyId(companyId);

            res.json(allTeams);
        })
        .post('/createTeam', async (req, res) => {
            const teamData = req.body;
            let result;

            try {
                result = await controller.createTeam(teamData);
            } catch (error) {
                return res.json({ err: error.message });
            }

            return res.json(result);
        });
};

module.exports = {
    init,
};