var models = require('../models');
var express = require('express');
var router = express.Router();
var User = models.User;
var jwt = require('jsonwebtoken');
var config = require('../config');

//@todo: Refactor this, be smarter :)
function regularAccess(req, res, next) {
    checkAuth(req, function(err) {
        if ( err ) {
            res.json({ success: false, message: 'Failed to authenticate token.' });
        }

        next();
    });
}

//@todo: Refactor this, be smarter :)
function adminAccess(req, res, next) {
    checkAuth(req, function(err, authorized) {
        if ( err || !authorized ) {
            res.json({ success: false, message: 'Failed to authenticate token. (adminAcess)' });
        }

        next();
    });
}

//@Todo move this somewhere else
function checkAuth(req, callback) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'];

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                callback(err);
            } else {
                if ( decoded.user.admin ) {
                    console.log(decoded.user);
                    callback(null, true); //is admin
                } else {
                    console.log(decoded.user);
                    callback(null, false); //is not admin
                }
            }
        });

    } else {
        callback(true);
    }
}

//Regular users may fetch all users list
router.get('/users', regularAccess , function(req, res) {
    User.findAll({
        attributes : ['id', 'username', 'admin']
    }).then(function(data) {
        res.json(data);
    });
});


//Only admins may create other users
router.post('/users', adminAccess, function(req, res) {
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