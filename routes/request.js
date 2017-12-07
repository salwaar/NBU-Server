var express = require('express');
var router = express.Router();

var models = require('../models');


// Post route for adding/removing subjects requests from students to advisors
router.post('/reqStuEdit', function (req, res, next) {
    var ReqData = req.body.ReqData;

    var reqSubId = ReqData.Sub_id;
    var reqStuId = ReqData.Stu_id;
    var reqReason = ReqData.Reason;
    var reqAcaId = ReqData.Aca_id;

    if (!(reqSubId && reqStuId && reqAcaId && reqReason)) return res.send({ error: "error missing params" });


    models.Req_Stu.findOrCreate({
        where: { Sub_id: reqSubId, Stu_id: reqStuId },
        defaults: {
            Reason: reqReason,
            Aca_id: reqAcaId
        }
    })
        .spread((request, created) => {

            if (created) {
                res.send({ request: request });
            } else {
                res.send({ error: reqReason + " Request for this Subject from the same Student already exists!" });
            }
        }).catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })

});


// Post route for approving subjects requests from students by advisors
router.post('/reqApprove', function (req, res, next) {
    var ReqData = req.body.ReqData;

    var reqSubId = ReqData.Sub_id;
    var reqStuId = ReqData.Stu_id;
    var reqReason = ReqData.Reason;

    if (!(reqSubId && reqStuId)) return res.send({ error: "error missing params" });

    models.Req_Stu.destroy({ where: { Stu_id: reqStuId, Sub_id: reqSubId } })
        .then(count => {
            if (reqReason == "Add") {
                return models.SubStu.create({
                    Stu_id: reqStuId, Sub_id: reqSubId, Status: "Current"
                })
            } else {
                return models.SubStu.destroy({
                    where: {
                        Stu_id: reqStuId, Sub_id: reqSubId
                    }
                })
            }

        })
        .then(function (SubStu) {
            res.send({ SubStu: SubStu });
        })
        .catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })
});

// Post route for declining subjects requests from students by advisors
router.post('/reqDecline', function (req, res, next) {
    var ReqData = req.body.ReqData;

    var reqSubId = ReqData.Sub_id;
    var reqStuId = ReqData.Stu_id;

    if (!(reqSubId && reqStuId)) return res.send({ error: "error missing params" });

    models.Req_Stu.destroy({ where: { Stu_id: reqStuId, Sub_id: reqSubId } })
        .then(count => {
            res.send({ count: count });
        })
        .catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })
});


// Post route for getting all request to advisor
router.post('/myRequests', function (req, res, next) {
    var AcaId = req.body.AcaId;



    if (!(AcaId)) return res.send({ error: "error missing params" });

    models.Req_Stu.findAll({
        where: { Aca_id: AcaId },
        include: [
            // include the subjects
            { model: models.Plan },
            { model: models.Students }
        ]
    })
        .then(requests => {
            // 
            if (!requests.length) {
                res.send({ error: "No requests assigned to this Advisor yet!!" });
            } else {
                res.send({ requests: requests });
            }
        })
        .catch(function (error) {
            res.send({ error: "Unexpected error please try again!" });
        })
});

module.exports = router;
