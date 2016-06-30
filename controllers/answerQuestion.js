var models = require('../models');
var express = require('express');
var router = express.Router();
var Question = models.Question;
var authorization = require('../middlewares/authorization');
var sequelize = require('../models').sequelize;
var MCValidator = require('../validators/MCValidator');

router.post('/practice/:questionId', authorization.regularAccess, function(req, res) {
    Question.findOne({
        attributes : ['id', 'questionData'],
        where: {id: req.params.questionId },
    }).then(function(data) {
        authorization.decodeToken(req)
            .then(function(decoded) {
                let correct = MCValidator.validate(req.body.answers, data.questionData),
                    query = `INSERT INTO students_question (questionId, studentId, correct) VALUES ( ${data.id}, ${decoded.user.id}, ${correct} )`;

                sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
                    .then(function(data) {
                        res.json({ success: true, data: data });
                    })
                    .catch(function(error) {
                        res.json({ success: false, data: error });
                    });

            });
    });
});

module.exports = router;