var express = require('express');
var router = express.Router();

var models = require('../models');

/* POST Advisor Login. */
router.post('/advLogin', function (req, res, next) {
  var AdvData = JSON.parse(req.body.AdvData);
  var advId = AdvData.advId;
  var advPassword = AdvData.advPassword;
  if (!(advId && advPassword)) return res.send({ error: "error missing params" });

  models.ACA_ADV.findOne({ where: { Aca_id: advId, password: advPassword } })
    .then(advisor => {
      // 
      if (!advisor) {
        res.send({ error: "Advisor not found with matching data!" });
      } else {
        advisor.getDepartment()
          .then(function (department) {
            advisor.dataValues.Dep_name = department.Dep_name;
            res.send({ advisor: advisor });
          })

      }
    }).catch(function () {
      res.send({ error: "Unexpected error please try again!" });
    })

});



/* POST Advisor SignUp. */
router.post('/advSignUp', function (req, res, next) {
  var AdvData = JSON.parse(req.body.AdvData);

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
      console.log(advisor.get({
        plain: true
      }))
      console.log(created)
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

/* POST Student Create. */
router.post('/stuCreate', function (req, res, next) {

  var stuId = req.body.stuId;
  var stuPassword = req.body.stuPassword;
  var stuName = req.body.stuName;
  var stuDepartment = req.body.stuDepartment;
  var stuLevel = req.body.stuLevel;
  var stuAcAdv = req.body.stuAcAdv;

  models.Students.findOrCreate({
    where: { Stu_id: stuId },
    defaults: {
      password: stuPassword,
      Stu_name: stuName,
      Dep_id: stuDepartment,
      Level: stuLevel,
      Aca_id: stuAcAdv
    }
  })
    .spread((student, created) => {
      console.log(student.get({
        plain: true
      }))
      console.log(created)
      if (created) {
        student.getDepartment()
          .then(function (department) {
            student.dataValues.Dep_name = department.Dep_name;
            res.send({ student: student });
          })

      } else {
        res.send({ error: "Student with the same ID already exists!" });
      }
    }).catch(function () {
      res.send({ error: "Unexpected error please try again!" });
    })

});


/* POST Student Login. */
router.post('/stuLogin', function (req, res, next) {
  var stuId = req.body.stuId;
  var stuPassword = req.body.stuPassword;
  if (!(stuId && stuPassword)) return res.send({ error: "error missing params" });

  model.Students.findOne({ where: { Stu_id: stuId, password: stuPassword } })
    .then(student => {
      // 
      student.getDepartment()
        .then(function (department) {
          student.dataValues.Dep_name = department.Dep_name;
          res.send({ student: student });
        })
    }).catch(function () {
      res.send({ error: "Unexpected error please try again!" });
    })
});


module.exports = router;
