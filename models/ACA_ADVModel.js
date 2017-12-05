'use strict';

module.exports = function (sequelize, DataTypes) {
    var ACA_ADV = sequelize.define('ACA_ADV', {
        Aca_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, //  ACA_ADV primary key 
        Aca_name: { type: DataTypes.STRING, allowNull: false }, // academic name
        password: { type: DataTypes.STRING, allowNull: false } // academic advisory's password
    });
    ACA_ADV.associate = function (models) {
        models.ACA_ADV.hasMany(models.Students, {
            foreignKeyConstraint: true,
            foreignKey: 'Aca_id'
        });

        models.ACA_ADV.belongsTo(models.Department, {
            foreignKeyConstraint: true,
            foreignKey: 'Dep_id'
        });
    }
    return ACA_ADV;
}
