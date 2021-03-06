'use strict';
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        name: DataTypes.STRING,
    }, {
        paranoid: true,
    });
    Status.associate = (models) => {
        // associations can be defined here
    };
    return Status;
};
