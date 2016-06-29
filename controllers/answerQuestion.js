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
        console.log( MCValidator.validate(req.body.answers, data.questionData) );
        res.json({question: data});
    });
});

module.exports = router;