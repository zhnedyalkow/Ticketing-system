'use strict';
module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define('Label', {
        title: DataTypes.STRING,
    }, {
        paranoid: true,
    });
    Label.associate = function (models) {
        // associations can be defined here
    };
    return Label;
};