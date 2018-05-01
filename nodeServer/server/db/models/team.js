'use strict';
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        name: DataTypes.STRING,
    }, {
        paranoid: true,
    });
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