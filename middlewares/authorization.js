'use strict';

var jwt         = require('jsonwebtoken'),
    config      = require('../config');


function regularAccess(req, res, next) {
    checkAuth(req, res, function(err) {
        if ( err ) {
            res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            next();
        }
     });
}


function adminAccess(req, res, next) {
    checkAuth(req, res, function(err, authorized) {
        if ( err || !authorized ) {
            res.json({ success: false, message: 'Failed to authenticate token. (Admin access required)' });
        } else {
            next();
        }
    });
}

function checkAuth(req, res, callback) {
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
    } else {
        res.status(500).send('You are not authenticated');
    }
}

function decodeToken(req) {
    return new Promise(function( resolve, reject ) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'];

        if ( token ) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        } else {
            reject(false);
        }
    });
}


module.exports = { regularAccess: regularAccess, adminAccess: adminAccess, decodeToken: decodeToken };

