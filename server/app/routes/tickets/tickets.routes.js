const {
    Router,
} = require('express');

const TicketsController = require('./tickets.controller');

const init = (app, data) => {
    const controller = new TicketsController(data);
    const router = new Router();
    app.use('/ticket', router);

    router
        .get('/getAllUsersByTeam', async (req, res) => {
            const teamId = req.query.team;
            const members = await controller
                .getAllMembersByTeamId(teamId);

            res.json(members);
        })
        .get('/getTicketInfoById', async (req, res) => {
            const ticketId = req.query.ticketId;
            const ticket = await controller
                .getTicketUsers(ticketId);

            res.json(ticket);
        })
        .get('/getTicketCreator', async (req, res) => {
            const ticketId = req.query.ticketId;
            const creator = await controller
                .getTicketUserByTicketId(ticketId);

            res.json(creator);
        });
};

module.exports = {
    init,
};
