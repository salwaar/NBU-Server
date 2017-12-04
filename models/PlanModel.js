'use strict';

module.exports = function (sequelize, DataTypes) {
    var Plan = sequelize.define('Plan', {
        Sub_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }, //  Students primary key 
        Sub_name: { type: DataTypes.STRING, allowNull: false }, // academic name
        Level: { type: DataTypes.INTEGER },
        Hour: { type: DataTypes.STRING, allowNull: false }, // academic advisory's password
        Sub_dep: { type: DataTypes.INTEGER },
        pre_req_id: { type: DataTypes.INTEGER },
        pre_req_name: { type: DataTypes.STRING }
    });
    Plan.associate = function (models) {
        models.Plan.hasMany(models.SubStu, {
            foreignKeyConstraint: true,
            foreignKey: 'Sub_id'
        });
    }
    return Plan;
}
