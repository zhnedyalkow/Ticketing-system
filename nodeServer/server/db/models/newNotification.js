'use strict';
module.exports = (sequelize, DataTypes) => {
    const NewNotification = sequelize.define('NewNotification', {}, {
        paranoid: true,
    });
    NewNotification.associate = (models) => {
        const {
            User,
            Notification,
        } = models;

        NewNotification.belongsTo(User, { onDelete: 'cascade' });
        NewNotification.belongsTo(Notification, {
            onDelete: 'cascade',
        });
    };

    return NewNotification;
};
