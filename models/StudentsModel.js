'use strict';

module.exports = function (sequelize, DataTypes) {
    var Students = sequelize.define('Students', {
        Stu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, //  Students primary key 
        Stu_name: { type: DataTypes.STRING, allowNull: false }, // academic name
        Level: { type: DataTypes.INTEGER },

        Address: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING, allowNull: false }
    });
    Students.associate = function (models) {
        models.Students.belongsTo(models.ACA_ADV, {
            foreignKeyConstraint: true,
            foreignKey: 'Aca_id'
        });

        models.Students.belongsTo(models.Department, {
            foreignKeyConstraint: true,
            foreignKey: 'Dep_id'
        });

        models.Students.hasMany(models.SubStu, {
            foreignKeyConstraint: true,
            foreignKey: 'Stu_id'
        });
    }
    return Students;
}
