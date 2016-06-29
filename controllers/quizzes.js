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

module.exports = router;