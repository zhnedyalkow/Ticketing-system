const {
    Router,
} = require('express');

const CommentsController = require('./comments.controller');

const init = (app, data) => {
    const controller = new CommentsController(data);
    const router = new Router();
    app.use('/Comment', router );

    router
        .get('/getAllComments', async (req, res) => {
            const ticketId = req.query.ticketId;

            if (typeof ticketId === 'undefined') {
                res.sendStatus(403);
            }

            const allComments = await controller
                .getAllCommentsByTicketId(ticketId);

                res.json(allComments);
        })
        .post('/createComment', async (req, res) => {
            const commentsData = req.body;
            let result;

            try {
                result = await controller.createComment(commentsData);
            } catch (error) {
                return res.json({ err: error.message });
            }
            return res.json(result);
        });
};

module.exports = {
    init,
};
