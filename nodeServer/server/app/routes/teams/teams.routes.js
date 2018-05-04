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
            let teamList;

            try {
                teamList = await controller
                    .getMyTeams(req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(teamList);
        })
        .get('/getTeamManager', async (req, res) => {
            const teamName = req.query.teamName;
            let teamManager;

            try {
                teamManager = await controller
                    .getTeamManager(teamName, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(teamManager);
        })
        .post('/deleteTeam', async (req, res) => {
            const teamName = req.body.teamName;
            let deletedRec;

            if (typeof req.user === 'undefined') {
                return res.sendStatus(403);
            }

            try {
                deletedRec = await controller.deleteTeam(teamName, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(deletedRec);
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
