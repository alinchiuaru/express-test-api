'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('students_question', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          questionId: {
            type: Sequelize.INTEGER
          },
          studentId: {
            type: Sequelize.INTEGER
          },
          correct: {
            type: Sequelize.BOOLEAN
          }
        })
        .then(function() {
            queryInterface.addIndex('students_question',
                ['questionId', 'studentId'],
                {
                    indexName: 'questionStudentIndex',
                    indicesType: 'UNIQUE'
                }
            )
        });
    },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('students_question');
  }
};
