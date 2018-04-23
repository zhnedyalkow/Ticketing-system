'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
  }, {});
  Team.associate = function(models) {
    const {
        Company,
    } = models;

    Team.belongsTo(Company);
  };
  return Team;
};
