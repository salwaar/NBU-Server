var express = require('express');
var router = express.Router();
var models = require('../models');




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

  models.Students.findOne({ where: { Stu_id: stuId, password: stuPassword } })
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

router.post('/stuEdit', function (req, res, next) {
  var StuData = req.body.StuData;

  var stuId = StuData.Stu_id;
  var stuName = StuData.Stu_name;
  var stuLevel = StuData.Level;
  var stuDepartment = StuData.Department.Dep_id;



  if (!stuId) return res.send({ error: "error missing params" });

  models.Students.update({
    Stu_id: stuId,
    Stu_name: stuName,
    Dep_id: stuDepartment,
    Level: stuLevel
  }, { where: { Stu_id: stuId } })
    .then(count => {

      res.send(count);
    }).catch(function () {
      res.send({ error: "Unexpected error please try again!" });
    })
});


module.exports = router;
