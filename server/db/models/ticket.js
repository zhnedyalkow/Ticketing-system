'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    creator: DataTypes.INTEGER,
  }, {});
  Ticket.associate = function(models) {
    const {
        Status,
        User,
        Label,
        Team,
    } = models;

    Ticket.belongsTo(Label);
    Ticket.belongsTo(User);
    Ticket.belongsTo(Team);
    Ticket.belongsTo(Status);
  };
  return Ticket;
};
