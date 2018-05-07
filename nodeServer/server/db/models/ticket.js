'use strict';
module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        dueDate: DataTypes.DATE,
        AssignedUserId: DataTypes.INTEGER,
        CreatorId: DataTypes.INTEGER,
    }, {
        paranoid: true,
    });
    Ticket.associate = (models) => {
        const {
            Status,
            User,
            Label,
            Team,
        } = models;

        Ticket.belongsTo(Label);
        Ticket.belongsTo(User, {
            as: 'AssignedUser',
            foreignKey: 'AssignedUserId',
        });
        Ticket.belongsTo(User, {
            as: 'Creator',
            foreignKey: 'CreatorId',
        });
        Ticket.belongsTo(Team);
        Ticket.belongsTo(Status);
    };
    return Ticket;
};
