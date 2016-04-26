var models = require('../models');
var express = require('express');
var router = express.Router();
var Course = models.Course;
var authorization = require('../middlewares/authorization');

router.get('/courses', authorization.adminAccess, function(req, res) {
    Course.findAll({
        attributes : ['id', 'name', 'description']
    }).then(function(data) {
        res.json(data);
    });
});


router.post('/courses', authorization.adminAccess, function(req, res) {
    var createdById = authorization.decodeToken(req) ? authorization.decodeToken(req).user.id : -1;

    Course.create({
        name: req.body.name,
        description: req.body.description || '',
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