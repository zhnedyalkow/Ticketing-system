const Data = require('../data/generic.data');

const {
    Notification,
    NewNotification,
} = require('../../db/models');

class NotificationData extends Data {
    constructor() {
        super(Notification, []);
    }

    getnewNotifications(userId) {
        const result = NewNotification.findAll({
            where: {
                UserId: userId,
            },
            attributes: [],
            include: {
                model: Notification,
                attributes: ['name', 'description'],
            },
        });

        return result;
    }
}

module.exports = NotificationData;
