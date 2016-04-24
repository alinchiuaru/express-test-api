'use strict';

var express     = require('express'),
    app         = express(),
    routes      = express.Router(),
    jwt         = require('jsonwebtoken'),
    config      = require('../config');


function _grantAcess( isAdminRequired ) {
    var isAdminRequired = isAdminRequired || false;

    routes.use(function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'];
        if ( token ) {
            jwt.verify(token, config.secret, function(err, decoded) {
                console.log(decoded.user);
                if (err ||  (isAdminRequired && decoded.user.admin) ) {
                    res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                   next();
                }
            });
        } 
    });
}

routes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'];
    if ( token ) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
               next();
            }
        });
    } 
});

module.exports = routes;