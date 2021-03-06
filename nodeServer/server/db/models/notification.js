'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    }, {
        paranoid: true,
    });
    Notification.associate = (models) => {
        const {
            User,
        } = models;

        Notification.belongsTo(User);
    };
    return Notification;
};
