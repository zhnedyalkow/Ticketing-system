'use strict';
module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define('Label', {
        title: DataTypes.STRING,
    }, {
        paranoid: true,
    });
    Label.associate = (models) => {
        // associations can be defined here
    };
    return Label;
};
