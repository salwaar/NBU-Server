module.exports = function (sequelize, DataTypes) {

    var Req_Stu = sequelize.define('Req_Stu', {
        Stu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Stu_name: { type: DataTypes.STRING, allowNull: false },
        Sub_name: { type: DataTypes.STRING, allowNull: false },
        Level: { type: DataTypes.INTEGER, allowNull: false },
        ACA_ID: { type: DataTypes.INTEGER }
    });

    Req_Stu.associate = function (models) {
        models.Req_Stu.belongsTo(models.SubStu, {
            foreignKeyConstraint: true,
            foreignKey: 'Stu_id'
        });


        models.Req_Stu.belongsTo(models.ACA_ADV, {
            foreignKeyConstraint: true,
            foreignKey: 'ACA_ID'
        });
    }
    return Req_Stu;
};