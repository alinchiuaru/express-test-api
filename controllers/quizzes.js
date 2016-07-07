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

            const query = `SELECT id, title, score, questionData, quizId FROM Questions
            WHERE id NOT IN (SELECT questionId FROM students_question WHERE studentId = ${userId} AND quizId = ${quizId})
            AND quizId = ${quizId}`;

            sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
                .then(function(data) { //set all the correct values to false by 'default'
                    let newData = data.map(function(question) {
                        let questionData = JSON.parse(question.questionData);

                        let newQuestionData = questionData.answers.map(function(answer) {
                            return { answer: answer.answer, correct: false };
                        });

                        return Object.assign(question, { questionData: newQuestionData });
                    });

                    res.json({ success: true, data: newData });
                })
                .catch(function(error) {
                    res.json({ success: false, data: error });
                });
        });
});

router.get('/quizzes/:quizId/score', authorization.regularAccess, function(req, res) {
    authorization.decodeToken(req)
        .then(function(decoded) {
            const userId = decoded.user.id,
                receivedScoreQuery = `SELECT SUM(receivedScore) FROM students_question WHERE quizId = ${req.params.quizId} AND studentId= ${userId}`;
                receivedScore = sequelize.query(receivedScoreQuery, {type: sequelize.QueryTypes.SELECT}),
                totalScore = Question.sum('score', {
                    where: { quizId: req.params.quizId }
                });

             Promise.all([totalScore, receivedScore])
                .then((response) => {
                    res.json({ success: true, data: { totalScore: response[0], receivedScore: response[1][0]['SUM(receivedScore)'] } })
                });
        });
});


router.post('/quizzes', authorization.adminAccess, function(req, res) {
    Quiz.create({
        name: req.body.name,
        description: req.body.description || '',
        courseId: req.body.courseId,
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});

module.exports = router;