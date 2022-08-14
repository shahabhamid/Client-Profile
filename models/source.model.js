const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Source: { type: DataTypes.STRING, allowNull: true },
        CreatedBy: { type: DataTypes.STRING, allowNull: true }
    };
    const options = {};
    return sequelize.define('Source', attributes, options);
}