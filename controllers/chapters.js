var models = require('../models');
var express = require('express');
var router = express.Router();
var Chapter = models.Chapter;
var jwt = require('jsonwebtoken');
var config = require('../config');
var authorization = require('../middlewares/authorization');
const querystring = require('querystring');

router.get('/chapters', authorization.adminAccess, function(req, res) {
    Chapter.findAll({
        attributes : ['id', 'title', 'description', 'lectureNote']
    }).then(function(data) {
        res.json(data);
    });
});


router.get('/chapters/:chapterId', authorization.regularAccess, function(req, res) {
    Chapter.findOne({
        attributes : ['id', 'title', 'description', 'lectureNote'],
        where: { id: req.params.chapterId }
    }).then(function(data) {
        var lectureNote = querystring.unescape(data.lectureNote);
        res.json({ success: true, data: Object.assign(data, { lectureNote }) });
    });
});


router.post('/chapters', authorization.adminAccess, function(req, res) {
    Chapter.create({
        title: req.body.title,
        description: req.body.description || '',
        courseId: req.body.courseId,
        lectureNote: querystring.escape(req.body.lectureNote)
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});


module.exports = router;