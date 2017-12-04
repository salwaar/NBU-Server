'use strict';

module.exports = function (sequelize, DataTypes) {
    var SubStu = sequelize.define('SubStu', {
        Stu_id: {
            type: DataTypes.INTEGER
        }, //  department primary key 
        Sub_id: { type: DataTypes.INTEGER, allowNull: false }, // department name
        Status: { type: DataTypes.STRING, allowNull: false } // either Failed, Succeed or Studying
    });
    SubStu.associate = function (models) {
        models.SubStu.belongsTo(models.Students, {
            foreignKeyConstraint: true,
            foreignKey: 'Stu_id'
        });
        models.SubStu.belongsTo(models.Plan, {
            foreignKeyConstraint: true,
            foreignKey: 'Sub_id'
        });
    }
    return SubStu;
}



