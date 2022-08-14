const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    Source = require('./source.model')(sequelize);

    const attributes = {
        Name: { type: DataTypes.STRING, allowNull: true },
        Phone: { type: DataTypes.STRING, allowNull: true },
        Email: { type: DataTypes.STRING, allowNull: true },
        DOB: { type: DataTypes.STRING, allowNull: true },
        PAN: { type: DataTypes.STRING, allowNull: true },
        Address: { type: DataTypes.STRING, allowNull: true },
        City: { type: DataTypes.STRING, allowNull: true },
        State: { type: DataTypes.STRING, allowNull: true },
        PINCode: { type: DataTypes.STRING, allowNull: true },
        Occupation: { type: DataTypes.STRING, allowNull: true },
        Organization: { type: DataTypes.STRING, allowNull: true },
        Designation: { type: DataTypes.STRING, allowNull: true },
        Source: {
            type: DataTypes.INTEGER, allowNull: true,
            references: {
                model: Source,
                key: 'id'
            }
        },
        Type: { type: DataTypes.STRING, allowNull: true },
        Anniversary: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {};

    return sequelize.define('Client', attributes, options);
}