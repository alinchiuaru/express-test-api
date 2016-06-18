'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('courses_students', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          courseId: {
            type: Sequelize.INTEGER
          },
          studentId: {
            type: Sequelize.INTEGER
          }
        })
        .then(function() {
            queryInterface.addIndex('courses_students',
                ['courseId', 'studentId'],
                {
                    indexName: 'courseStudentIndex',
                    indicesType: 'UNIQUE'
                }
            )
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('courses_students');
    }
};
