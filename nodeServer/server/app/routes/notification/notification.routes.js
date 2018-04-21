const {
    Router,
} = require('express');

const NotificationController = require('./notification.controller');

const init = (app, data) => {
    const controller = new NotificationController(data);
    const router = new Router(data);
    app.use('/Notifications', router );

    router
        .get('/getNewNotifications', async (req, res) => {
            if (typeof req.userId === 'undefined') {
                return res.sendStatus(403);
            }

            const userId = req.userId;
            const newNotification = await controller
                .getNewNotificationsByUserId(userId);

            return res.json(newNotification);
        })
        .get('/getAllMyNotifications', async (req, res) => {
            if (typeof req.userId === 'undefined') {
                return res.sendStatus(403);
            }

            const userId = req.userId;
            const notifications = await controller
                .getAllNotificationByUserId(userId);

            return res.json(notifications);
        });
};

module.exports = {
    init,
};
