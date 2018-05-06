class NotificationController {
    constructor(data) {
        this.data = data;
    }

    getNewNotificationsByUserId(userId) {
        const result = this.data.notifications.getnewNotifications(userId);

        return result;
    }

    getAllNotification(user) {
        const result = user.getNotifications({
            order: [['id', 'DESC']],
        });

        return result;
    }
}

module.exports = NotificationController;
