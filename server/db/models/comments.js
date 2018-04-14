'use strict';
module.exports = (sequelize, DataTypes) => {
    var Comments = sequelize.define('Comments', {
        description: DataTypes.STRING,
    }, {});
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