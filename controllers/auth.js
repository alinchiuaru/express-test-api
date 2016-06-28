'use strict';

var models    = require('../models');
var express   = require('express');
var router    = express.Router();
var User      = models.User;
var jwt       = require('jsonwebtoken');
var config    = require('../config');
var cryptoMD5 = require('crypto-js/md5');


function generateToken(user) {
    return jwt.sign({ user: user }, config.secret, {
        expiresIn: '24h'
    });
}

router.post('/auth', function(req, res) {
    User.findOne({ where: { username: req.body.username } })
        .then(function(user) {
            if ( !user || user.password !==  cryptoMD5(req.body.password).toString()  ) {
                res.json({ success: false, message: 'Username or password is incorrect!' });
            } else {
                user.password = cryptoMD5(user.password).toString(); //crypt the password before generating the token

                var token = generateToken(user);
                res.json({ success: true, message: 'You have been sucessfully authenticated!', token: token });
            }
        });
});


module.exports = router;