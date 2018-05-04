'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        avatar: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        paranoid: true,
    });
    User.associate = (models) => {
        const {
            Company,
            Team,
            Notification,
        } = models;

        User.hasMany(Notification);
        User.belongsTo(Company);
        User.belongsToMany(Team, {
            through: 'TeamMembers',
        });
        Team.belongsToMany(User, {
            through: 'TeamMembers',
        });
    };
    return User;
};