'use strict';
module.exports = (sequelize, DataTypes) => {
  var Notification = sequelize.define('Notification', {
    name: DataTypes.STRING
  }, {});
  Notification.associate = function(models) {
    const {
        User,
    } = models;

    Notification.belongsTo(User);
  };
  return Notification;
};