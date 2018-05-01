'use strict';
module.exports = (sequelize, DataTypes) => {
    const NewNotification = sequelize.define('NewNotification', {}, {
        paranoid: true,
    });
    NewNotification.associate = function (models) {
        const {
            User,
            Notification,
        } = models;

        NewNotification.belongsTo(User);
        NewNotification.belongsTo(Notification);
    };

    return NewNotification;
};