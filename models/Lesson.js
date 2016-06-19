module.exports = function (sequelize, DataTypes) {
    var Lesson = sequelize.define(
        'Lesson', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.STRING
            },

            content: {
                type: DataTypes.STRING
            }
        },
        {
            classMethods:{
                associate:function(models){
                    Lesson.belongsTo(models.Chapter, { foreignKey: 'chapterId'} );
                }
            }
        }
    );

    return Lesson;
};