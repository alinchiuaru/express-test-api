var models = require('../models');
var express = require('express');
var router = express.Router();
var Chapter = models.Chapter;
var jwt = require('jsonwebtoken');
var config = require('../config');
var authorization = require('../middlewares/authorization');

router.get('/chapters', authorization.adminAccess, function(req, res) {
    Chapter.findAll({
        attributes : ['id', 'title', 'description', 'lectureNode']
    }).then(function(data) {
        res.json(data);
    });
});


router.post('/chapters', authorization.adminAccess, function(req, res) {
    Chapter.create({
        title: req.body.title,
        description: req.body.description || '',
        courseId: req.body.courseId,
        lectureNote: req.body.lectureNote
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});


module.exports = router;