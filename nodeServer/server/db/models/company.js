'use strict';
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        name: DataTypes.STRING,
    }, {
        paranoid: true,
    });
    Company.associate = function (models) {
        // associations can be defined here
    };
    return Company;
};