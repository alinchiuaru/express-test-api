var models = require('../models');
var express = require('express');
var router = express.Router();
var Question = models.Question;
var jwt = require('jsonwebtoken');
var config = require('../config');
var authorization = require('../middlewares/authorization');
const querystring = require('querystring');


router.get('/questions', authorization.adminAccess, function(req, res) {
    Question.findAll({
        attributes : ['id', 'title', 'questionData', 'quizId', 'score']
    }).then(function(data) {
        res.json({success: true, data: data});
    });
});

router.get('/questions/:questionId', authorization.adminAccess, function(req, res) {
    Question.findOne({
        attributes : ['id', 'title', 'questionData', 'quizId', 'score'],
        where: { id: req.params.questionId }
    }).then(function(data) {
        res.json({success: true, data: data});
    });
});


router.post('/questions', authorization.adminAccess, function(req, res) {
    Question.create({
        title: req.body.title,
        score: req.body.score || 0,
        quizId: req.body.quizId,
        questionData: req.body.questionData
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});


module.exports = router;