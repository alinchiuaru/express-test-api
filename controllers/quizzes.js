var models = require('../models');
var express = require('express');
var router = express.Router();
var Quiz = models.Quiz;
var Question = models.Question;
var authorization = require('../middlewares/authorization');
var sequelize = require('../models').sequelize;


router.get('/quizzes/:quizId', authorization.regularAccess, function(req, res) {
    Quiz.findOne({
        attributes : ['id', 'name', 'description'],
        where: {id: req.params.quizId },
        include: [ {model: Question, as: 'questions'} ]
    }).then(function(data) {
        res.json({success: true, data: data});
    });
});

router.get('/quizzes/:quizId/progress', authorization.regularAccess, function(req, res) {
    authorization.decodeToken(req)
        .then(function(decoded) {
            const userId = decoded.user.id;
            const quizId = req.params.quizId;

            const query = `SELECT id, title, score, questionData FROM Questions
            WHERE id NOT IN (SELECT questionId FROM students_question WHERE studentId = ${userId})
            AND quizId = ${quizId}`;

            sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
                .then(function(data) {
                    res.json({ success: true, data: data });
                })
                .catch(function(error) {
                    res.json({ success: false, data: error });
                });
        });
});

module.exports = router;