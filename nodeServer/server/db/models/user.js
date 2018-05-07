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
            Ticket,
        } = models;

        User.hasMany(Notification);
        User.hasMany(Ticket, { foreignKey: 'AssignedUserId' });
        User.belongsTo(Company);

        User.belongsToMany(Team, {
            through: 'TeamMembers',
            onDelete: 'cascade',
        });
        Team.belongsToMany(User, {
            through: 'TeamMembers',
            onDelete: 'cascade',
        });
    };
    return User;
};
