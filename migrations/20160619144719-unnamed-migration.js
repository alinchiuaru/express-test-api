'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('courses_instructors', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          courseId: {
            type: Sequelize.INTEGER
          },
          instructorId: {
            type: Sequelize.INTEGER
          }
        })
        .then(function() {
            queryInterface.addIndex('courses_instructors',
                ['courseId', 'instructorId'],
                {
                    indexName: 'courseInstructorIndex',
                    indicesType: 'UNIQUE'
                }
            )
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('courses_students');
    }
};
