'use strict';

module.exports = function (sequelize, DataTypes) {
    var Department = sequelize.define('Department', {
        Dep_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, //  department primary key 
        Dep_name: { type: DataTypes.STRING, allowNull: false } // department name
    });
    Department.associate = function (models) {
        models.Department.hasOne(models.ACA_ADV, {
            foreignKeyConstraint: true,
            foreignKey: 'Dep_id'
        });

        models.Department.hasOne(models.Students, {
            foreignKeyConstraint: true,
            foreignKey: 'Dep_id'
        });
    }
    return Department;
}
