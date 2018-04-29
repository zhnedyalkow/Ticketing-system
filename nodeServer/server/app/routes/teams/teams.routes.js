const {
    Router,
} = require('express');

const TeamsController = require('./teams.controller');

const init = (app, data) => {
    const controller = new TeamsController(data);
    const router = new Router();
    app.use('/Team', router);

    router
        .get('/getMyTeams', async (req, res) => {
            const userId = req.user.id;

            const teamList = await controller
                .getMyTeamsByUserId(userId);

            res.status(200).json(teamList);
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
                result = await controller
                    .createTeam(teamData, req.user.CompanyId, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(result);
        });
};

module.exports = {
    init,
};
