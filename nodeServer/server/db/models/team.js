'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
  }, {});
  Team.associate = (models) => {
    const {
      Company,
      User,
    } = models;

    Team.belongsTo(Company);
    Team.belongsTo(User, {
      as: 'TeamManager',
      foreignKey: 'TeamManagerId',
    });
  };
  return Team;
};
