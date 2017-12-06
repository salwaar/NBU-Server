var express = require('express');
var router = express.Router();

var models = require('../models');

/* POST Advisor Login. */
router.post('/advLogin', function (req, res, next) {
    var AdvData = req.body.AdvData;
    var advId = AdvData.advId;
    var advPassword = AdvData.advPassword;
    if (!(advId && advPassword)) return res.send({ error: "error missing params" });

    models.ACA_ADV.findOne({
        where: { Aca_id: advId, password: advPassword },
        include: [
            // include department
            { model: models.Department }
        ]
    })
        .then(advisor => {
            // 
            if (!advisor) {
                res.send({ error: "Advisor not found with matching data!" });
            } else {
                res.send({ advisor: advisor });


            }
        }).catch(function () {
            res.send({ error: "Unexpected error please try again!" });
        })

});



/* POST Advisor SignUp. */
router.post('/advSignUp', function (req, res, next) {
    var AdvData = req.body.AdvData;

    var advId = AdvData.advId;
    var advPassword = AdvData.advPassword;
    var advName = AdvData.advName;
    var advDepartment = AdvData.advDepartment;
    var advEmail = AdvData.advEmail || "";

    models.ACA_ADV.findOrCreate({
        where: { Aca_id: advId },
        defaults: {
            password: advPassword,
            Aca_name: advName,
            Dep_id: advDepartment,
            Email: advEmail
        }
    })
        .spread((advisor, created) => {
            // console.log(advisor.get({
            //     plain: true
            // }))
            // console.log(created)
            if (created) {
                advisor.getDepartment()
                    .then(function (department) {
                        advisor.dataValues.Dep_name = department.Dep_name;
                        res.send({ advisor: advisor });
                    })
            } else {
                res.send({ error: "Advisor with the same ID already exists!" });
            }
        }).catch(function (err) {
            res.send({ error: "Unexpected error please try again!" });
        })
});


router.post('/myStudents', function (req, res, next) {
    var AdvId = req.body.AdvId;


    if (!AdvId) return res.send({ error: "error missing params" });

    models.Students.findAll({
        where: { Aca_id: AdvId },
        include: [
            // include the department
            { model: models.Department }
        ]
    })
        .then(students => {
            // 
            if (!students.length) {
                res.send({ error: "No Student assigned to You yet!!" });
            } else {
                res.send({ students: students });
            }
        }).catch(function () {
            res.send({ error: "Unexpected error please try again!" });
        })

});


module.exports = router;
