var models = require('../models');
var express = require('express');
var router = express.Router();
var User = models.User;
var jwt = require('jsonwebtoken');
var config = require('../config');
var authorization = require('../middlewares/authorization');

//Regular users may fetch all users list
router.get('/users', authorization.adminAccess, function(req, res) {
    User.findAll({
        attributes : ['id', 'username', 'admin']
    }).then(function(data) {
        res.json(data);
    });
});


//Only admins may create other users
router.post('/users', authorization.adminAccess, function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin || false
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});


module.exports = router;