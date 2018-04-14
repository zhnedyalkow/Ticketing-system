'use strict';
module.exports = (sequelize, DataTypes) => {
  var Status = sequelize.define('Status', {
    name: DataTypes.STRING
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
  };
  return Status;
};