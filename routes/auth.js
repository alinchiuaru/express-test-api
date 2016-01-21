var models  = require('../models');
var express = require('express');
var router  = express.Router();
var User    = models.User;
var jwt     = require('jsonwebtoken');
var config  = require('../config');


router.post('/auth', function(req, res) {
    User.findOne({ where: { username: req.body.username } })
        .then(function(user) {
            if (!user) {
                res.json({ succcess: false, message: 'Wrong username' });
            }

            if ( user.password != req.body.password ) {
                res.json({ succcess: false, message: 'Wrong password' });
            } else {
                var token = jwt.sign({user: user}, config.secret, {
                    expiresIn: 15 * 60 //sec
                });

                // res.header('Access-Control-Expose-Headers', token);
                res.json({ succcess: true, message: 'you are in buddy!', token: token });
            }
        });
});


module.exports = router;