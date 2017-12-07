var express = require('express');
var router = express.Router();

var models = require('../models');
/* POST Student Create. */
router.post('/subAdd', function (req, res, next) {
    var SubData = req.body.SubData;

    var subId = SubData.Sub_id;
    var subName = SubData.Sub_name;
    var subLevel = SubData.Level;
    var subHour = SubData.Hour;
    var subDepartment = SubData.Dep_id;

    var subPreReqId = SubData.Pre_req_id;


    models.Plan.findOrCreate({
        where: { Sub_id: subId },
        defaults: {
            Pre_req_id: subPreReqId,
            Sub_name: subName,
            Dep_id: subDepartment,
            Level: subLevel,
            Hour: subHour
        }
    })
        .spread((subject, created) => {
            // console.log(student.get({
            //   plain: true
            // }))
            // console.log(created)
            if (created) {
                res.send({ subject: subject });
                // student.getDepartment()
                // .then(function (department) {
                //   student.dataValues.Dep_name = department.Dep_name;
                //   res.send({ subject: subject });
                // })

            } else {
                res.send({ error: "Subject with the same ID already exists!" });
            }
        }).catch(function () {
            res.send({ error: "Unexpected error please try again!" });
        })

});
router.post('/mySubjects', function (req, res, next) {
    var StuId = req.body.StuId;


    if (!StuId) return res.send({ error: "error missing params" });

    models.SubStu.findAll({
        where: { Stu_id: StuId },
        order: [
            // Will escape username and validate DESC against a list of valid direction parameters
            [models.Plan, 'Level', 'DESC'],],
        include: [
            // include the subjects
            { model: models.Plan, include: [models.Department, { model: models.Plan, attributes: ["Sub_name", "Sub_id"], as: 'Subject' },] }
        ]
    })
        .then(subjects => {
            // 
            if (!subjects.length) {
                res.send({ error: "No Subjects assigned to this student yet!!" });
            } else {
                res.send({ subjects: subjects });
            }
        }).catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })

});

router.post('/allSubjects', function (req, res, next) {


    models.Plan.findAll({
        include: [
            // include the subjects
            { model: models.Plan, attributes: ["Sub_name", "Sub_id"], as: 'Subject' },
            { model: models.Department }
        ]
    })
        .then(subjects => {
            // 
            if (!subjects.length) {
                res.send({ error: "No Subjects added yet!!" });
            } else {
                res.send({ subjects: subjects });
            }
        }).catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })

});

router.post('/subStuEdit', function (req, res, next) {
    var SubStuData = req.body.SubStuData;

    var stuId = SubStuData.Stu_id;
    var subId = SubStuData.Sub_id;
    var subStuStatus = SubStuData.Status;


    if (!(stuId && subId)) return res.send({ error: "error missing params" });

    models.SubStu.findOrCreate({
        where: { Stu_id: stuId, Sub_id: subId },
        defaults: {
            Status: subStuStatus
        }
    })
        .spread((subStu, created) => {

            if (created) {
                res.send({ subStu: subStu });
            } else {
                res.send({ error: "Subject for this Student already exists!" });
            }
        }).catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })
});
module.exports = router;
