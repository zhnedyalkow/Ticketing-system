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
        .get('/getAllTicketsOfTeam', async (req, res) => {
            const teamName = req.query.team;
            let result;

            try {
                result = await controller
                    .getAllTicketsByTeam(teamName, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(result);
        })
        .get('/getAllTicketsByUserId', async (req, res) => {
            const userId = req.userId;
            const tickets = await controller.getAllTicketsByUserId(userId);

            res.json(tickets);
        })
        .post('/createTicket', async (req, res) => {
            if (typeof req.user === 'undefined') {
                return res.sendStatus(403);
            }

            const reqData = req.body;
            reqData.CreatorId = req.userId;
            let ticketInfo;

            try {
                ticketInfo = await controller.createTicket(reqData, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(ticketInfo);
        });
};

module.exports = {
    init,
};
