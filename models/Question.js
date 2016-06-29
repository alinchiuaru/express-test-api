module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define(
        'Question', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            questionData: {
                type: DataTypes.TEXT('long')
            }
        },
        {
            classMethods:{
                associate:function(models){
                    Question.belongsTo(models.Quiz, { foreignKey: 'quizId'} );
                }
            }
        }
    );

    return Question;
};