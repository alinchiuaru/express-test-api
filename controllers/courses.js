var models = require('../models');
var express = require('express');
var router = express.Router();
var Course = models.Course;
var authorization = require('../middlewares/authorization');
var sequelize = require('../models').sequelize;

router.get('/courses', authorization.adminAccess, function(req, res) {
    Course.findAll({
        attributes : ['id', 'title', 'description', 'logo']
    }).then(function(data) {
        res.json({success: true, data: data});
    });
});


router.post('/courses', authorization.adminAccess, function(req, res) {
    Course.create({
        title: req.body.title,
        description: req.body.description || '',
        logo: req.body.logo || ''
    })
    .then(function(data) {
        authorization.decodeToken(req)
            .then(function(decoded) {
                sequelize.query(`INSERT INTO courses_instructors (courseId, instructorId) VALUES ( ${data.dataValues.id}, ${decoded.user.id} )`, {type: sequelize.QueryTypes.INSERT})
                    .then(function() {
                        res.json({success: true, data: data});
                    });
            });
    })
    .catch(function(err) {
        res.json({success: false, message: err});
    });
});

router.get('/courses/me', authorization.regularAccess, function(req, res) {
    authorization.decodeToken(req)
        .then(function(decoded) {
            if ( decoded.user.admin ) {
                let query = `SELECT Courses.id, title, description, logo
                FROM Courses LEFT JOIN courses_instructors ON Courses.id=courses_instructors.courseId
                WHERE courses_instructors.instructorId = ${decoded.user.id}`;

                sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
                    .then(function(data) {
                        res.json({ success: true, data: data });
                    })
                    .catch(function(error) {
                        res.json({ success: false, data: error });
                    });
            } else {
                let query = `SELECT Courses.id, title, description, logo
                FROM Courses LEFT JOIN courses_students ON Courses.id=courses_students.courseId
                WHERE courses_students.instructorId = ${decoded.user.id}`;

                sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
                    .then(function(data) {
                        res.json({ success: true, data: data });
                    })
                    .catch(function(error) {
                        res.json({ success: false, data: error });
                    });
            }
        });
});
module.exports = router;