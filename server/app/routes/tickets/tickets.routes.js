const {
    Router,
} = require('express');

const TicketsController = require('./tickets.controller');

const init = (app, data) => {
    const controller = new TicketsController(data);
    const router = new Router();
    app.use('/Ticket', router);

    router
        .get('/getTicketInfoById', async (req, res) => {
            const ticketId = req.query.ticketId;
            const ticket = await controller
                .getTicketInfoById(ticketId);

            res.json(ticket);
        })
        .get('/getAllTicketsByTeamId', async (req, res) => {
            const teamId = req.query.teamId;
            const tickets = await controller.getAllTicketsByTeamId(teamId);

            res.json(tickets);
        })
        .get('/getAllTicketsByUserId', async (req, res) => {
            const userId = req.userId;
            const tickets = await controller.getAllTicketsByUserId(userId);

            res.json(tickets);
        })
        .post('/createTicket', async (req, res) => {
            if (typeof req.userId === 'undefined') {
                return res.sendStatus(403);
            }

            const reqData = req.body;
            reqData.CreatorId = req.userId;
            let ticketInfo;

            try {
                ticketInfo = await controller.createTicket(reqData);
            } catch (error) {
                return res.json({ err: error.message });
            }

            return res.json(ticketInfo);
        });
};

module.exports = {
    init,
};
