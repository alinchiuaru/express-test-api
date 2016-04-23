var express     = require('express'),
    app         = express(),
    routes      = express.Router(),
    jwt         = require('jsonwebtoken'),
    config      = require('../config');


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