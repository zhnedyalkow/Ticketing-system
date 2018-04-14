'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {});
    User.associate = function (models) {
        const {
            Company,
            Team,
            Notification
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