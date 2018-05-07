'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        description: DataTypes.TEXT,
    }, {
        paranoid: true,
    });
    Comments.associate = function (models) {
        const {
            User,
            Ticket,
        } = models;

        Comments.belongsTo(User);
        Comments.belongsTo(Ticket);
    };
    return Comments;
};