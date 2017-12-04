'use strict';

module.exports = function (sequelize, DataTypes) {
    var Department = sequelize.define('department', {
        Dep_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }, //  department primary key 
        Dep_name: { type: DataTypes.STRING, allowNull: false } // department name
    });

    return Department;
}
