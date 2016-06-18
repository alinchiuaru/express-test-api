var models = require('../models');
var express = require('express');
var router = express.Router();
var Lesson = models.Lesson;
var jwt = require('jsonwebtoken');
var config = require('../config');
var authorization = require('../middlewares/authorization');

router.get('/lessons', authorization.adminAccess, function(req, res) {
    Lesson.findAll({
        attributes : ['id', 'name', 'description']
    }).then(function(data) {
        res.json(data);
    });
});


router.post('/lessons', authorization.adminAccess, function(req, res) {
    var createdById = authorization.decodeToken(req) ? authorization.decodeToken(req).user.id : -1;

    Lesson.create({
        name: req.body.name,
        description: req.body.description || '',
        chapterId: req.body.courseId,
        createdByUser: createdById
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});


module.exports = router;