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
        attributes : ['id', 'username', 'email', 'admin']
    }).then(function(data) {
        res.json(data);
    });
});


//Only admins may create other users
router.post('/users', authorization.adminAccess, function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        admin: req.body.admin || false
    })
    .then(function(data) {
        res.json({success: true, data: data});
    })
    .catch(function(err) {
        res.json({success: false, message: err})
    });
});

// USER/ME not users, this will return all the details based on the token
router.get('/user/me', authorization.regularAccess, function(req, res) {
    authorization.decodeToken(req)
        .then( decoded => {
            User.findOne({
                attributes: ['id', 'username', 'email', 'admin'],
                where: {id: decoded.user.id}
            }).then(data => res.json({ success: true, data: data }));
        });
});


module.exports = router;