var models = require('../models');
var sequelize = require('../models').sequelize;
var express = require('express');
var router = express.Router();
var authorization = require('../middlewares/authorization');

//get all instructors from a course
router.get('/courses/:courseId/instructors', authorization.adminAccess, function(req, res) {
    var courseId = req.params.courseId;

    sequelize.query(`SELECT * from courses_instructors WHERE courseId = ${courseId}`, { type: sequelize.QueryTypes.SELECT})
        .then(function(instructors) {
            res.json({ success: true, data: instructors });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

//get all courses a instructor is assigned to
router.get('/courses/instructors/:instructorId', authorization.adminAccess, function(req, res) {
    var instructorId = req.params.instructorId;

    sequelize.query(`SELECT courseId from courses_instructors WHERE instructorId = ${instructorId}`, { type: sequelize.QueryTypes.SELECT})
        .then(function(coursesIds) {
            res.json({ success: true, data: coursesIds });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

//assign instructor to a course
router.post('/courses/:courseId/instructors/:instructorId', authorization.adminAccess, function(req, res) {
    var courseId = req.params.courseId,
        instructorId = req.params.instructorId;

    sequelize.query(`INSERT INTO courses_instructors (courseId, instructorId) VALUES ( ${courseId}, ${instructorId} )`, {type: sequelize.QueryTypes.INSERT})
        .then(function(entry) {
            res.json({ success: true, data: entry });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

//remove instructor from a course
router.delete('/courses/:courseId/instructors/:instructorId', authorization.adminAccess, function(req, res) {
    var courseId = req.params.courseId,
        instructorId = req.params.instructorId;

    sequelize.query(`DELETE FROM courses_instructors WHERE courseId = ${courseId} AND instructorId= ${instructorId}`, {type: sequelize.QueryTypes.DELETE})
        .then(function(entry) {
            res.json({ success: true, data: entry });
        })
        .catch(function(error) {
            res.json({ success: false, data: error });
        });

});

module.exports = router;