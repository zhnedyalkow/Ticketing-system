const {
    Router,
} = require('express');

const CommentsController = require('./comments.controller');

const init = (app, data) => {
    const controller = new CommentsController(data);
    const router = new Router();
    app.use('/comments', router);

    router
        .get('/getAllComments', async (req, res) => {
            const ticketId = req.query.ticketId;
            let allComments;

            try {
                allComments = await controller
                    .getAllCommentsByTicketId(ticketId, req.user);
            } catch (error) {
                return res.status(301).json({
                    err: error.message,
                });
            }

            return res.status(200).json(allComments);
        })
        .post('/createComment', async (req, res) => {
            const commentsData = req.body;
            let result;

            try {
                result = await controller.createComment(commentsData, req.user);
            } catch (error) {
                return res.status(301).json({
                    err: error.message,
                });
            }

            return res.status(200).json(result);
        });
};

module.exports = {
    init,
};