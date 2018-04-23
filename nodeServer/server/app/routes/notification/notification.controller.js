class NotificationController {
    constructor(data) {
        this.data = data;
    }

    getNewNotificationsByUserId(userId) {
        const result = this.data.notifications.getnewNotifications(userId);

        return result;
    }

    getAllNotificationByUserId(userId) {
        const result = this.data.notifications.getAllByCriteria({
            UserId: userId,
        });

        return result;
    }
}

module.exports = NotificationController;
