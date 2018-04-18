'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {});
    Notification.associate = function(models) {
        const {
            User,
        } = models;

        Notification.belongsTo(User);
    };
    return Notification;
};
