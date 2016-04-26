'use strict';

var jwt         = require('jsonwebtoken'),
    config      = require('../config');


function regularAccess(req, res, next) {
    checkAuth(req, function(err) {
        if ( err ) {
            console.log(err);
            res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            next();
        }
     });
}


function adminAccess(req, res, next) {
    checkAuth(req, function(err, authorized) {
        if ( err || !authorized ) {
            res.json({ success: false, message: 'Failed to authenticate token. (Admin access required)' });
        } else {
            next();
        }
    });
}

function checkAuth(req, callback) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'];

    if ( token ) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if ( err ) {
                callback(err);
            } else {
                if ( decoded.user.admin ) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
        });
    }
}

function decodeToken(req) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'],
        decodedToken = null;

    if ( !token ) {
        return decodeToken;
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if ( err ) {
            return decodedToken;
        } else {
            return decoded;
        }
    });
}


module.exports = { regularAccess: regularAccess, adminAccess: adminAccess, decodeToken: decodeToken };

