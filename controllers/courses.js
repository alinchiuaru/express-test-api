var models = require('../models');
var express = require('express');
var router = express.Router();
var Course = models.Course;
var authorization = require('../middlewares/authorization');
var sequelize = require('../models').sequelize;

router.get('/courses', authorization.adminAccess, function(req, res) {
    Course.findAll({
        attributes : ['id', 'title', 'description', 'logo']
    }).then(function(data) {
        res.json({success: true, data: data});
    });
});


router.post('/courses', authorization.adminAccess, function(req, res) {
    Course.create({
        title: req.body.title,
        description: req.body.description || '',
        logo: req.body.logo || ''
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err});
    });
});

module.exports = router;