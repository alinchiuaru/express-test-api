var models = require('../models');
var sequelize = require('../models').sequelize;
var express = require('express');
var router = express.Router();
var authorization = require('../middlewares/authorization');

//get all students from a course
router.get('/courses/:courseId/students', authorization.adminAccess, function(req, res) {
    var courseId = req.params.courseId;

    sequelize.query(`SELECT * from courses_students WHERE courseId = ${courseId}`, { type: sequelize.QueryTypes.SELECT})
        .then(function(students) {
            res.json({ success: true, data: students });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

//get all courses a student is assigned to
router.get('/courses/students/:studentId', authorization.adminAccess, function(req, res) {
    var studentId = req.params.studentId;

    sequelize.query(`SELECT courseId from courses_students WHERE studentId = ${studentId}`, { type: sequelize.QueryTypes.SELECT})
        .then(function(coursesIds) {
            res.json({ success: true, data: coursesIds });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

//assign student to a course
router.post('/courses/:courseId/students/:studentId', authorization.adminAccess, function(req, res) {
    var courseId = req.params.courseId,
        studentId = req.params.studentId;

    sequelize.query(`INSERT INTO courses_students (courseId, studentId) VALUES ( ${courseId}, ${studentId} )`, {type: sequelize.QueryTypes.INSERT})
        .then(function(entry) {
            res.json({ success: true, data: entry });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

//remove student from a course
router.delete('/courses/:courseId/students/:studentId', authorization.adminAccess, function(req, res) {
    var courseId = req.params.courseId,
        studentId = req.params.studentId;

    sequelize.query(`DELETE FROM courses_students WHERE courseId = ${courseId} AND studentId= ${studentId}`, {type: sequelize.QueryTypes.DELETE})
        .then(function(entry) {
            res.json({ success: true, data: entry });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

module.exports = router;