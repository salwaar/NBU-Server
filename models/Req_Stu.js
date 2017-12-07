module.exports = function (sequelize, DataTypes) {

    var Req_Stu = sequelize.define('Req_Stu', {
       
        Reason: { type: DataTypes.STRING, allowNull: false }
      
    });

    Req_Stu.associate = function (models) {
        models.Req_Stu.belongsTo(models.Students, {
            foreignKeyConstraint: true,
            foreignKey: 'Stu_id'
        });

        models.Req_Stu.belongsTo(models.Plan, {
            foreignKeyConstraint: true,
            foreignKey: 'Sub_id'
        });

        models.Req_Stu.belongsTo(models.ACA_ADV, {
            foreignKeyConstraint: true,
            foreignKey: 'Aca_ID'
        });
    }
    return Req_Stu;
};