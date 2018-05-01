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
            let ticket;

            try {
                ticket = await controller
                    .getTicketInfoById(ticketId, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(ticket);
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
            let tickets;

            try {
                tickets = await controller
                    .getAllTicketsByUserId(req.user);
            } catch (error) {
                return res
                    .status(302).json({ err: error.message });
            }

            return res.status(200).json(tickets);
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
        })
        .post('/deleteTicket', async (req, res) => {
            const ticketId = req.body.ticketId;
            let deletedRec;

            if (typeof req.user === 'undefined') {
                return res.sendStatus(403);
            }

            try {
                deletedRec = await controller.deleteTicket(ticketId, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(deletedRec);
        })
        .post(('/changeTicketStatus'), async (req, res) => {
            let status;
            try {
                status = await controller
                    .changeTicketStatus(req.body.name,
                        req.body.tickedId, req.user);
            } catch (error) {
                return res.status(302).json({ err: error.message });
            }

            return res.status(200).json(status);
        });
};

module.exports = {
    init,
};
