var models    = require('../models');
var express   = require('express');
var router    = express.Router();
var User      = models.User;
var jwt       = require('jsonwebtoken');
var config    = require('../config');
var cryptoMD5 = require('crypto-js/md5');


function generateToken(user) {
    return jwt.sign({ user: user }, config.secret, {
        expiresIn: 600 * 60 //sec
    });
}

router.post('/auth', function(req, res) {
    User.findOne({ where: { username: req.body.username } })
        .then(function(user) {

            if ( !user || user.password !==  cryptoMD5(req.body.password)  ) {
                res.json({ succcess: false, message: 'Username or password is incorrect!' });
            } else {

                var token = generateToken(user);
                res.json({ succcess: true, message: 'You have been sucessfully authenticated!', token: token });
            }
        });
});


module.exports = router;