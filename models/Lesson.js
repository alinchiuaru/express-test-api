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

            createdByUser: {
                type: DataTypes.INTEGER,
            },

            description: {
                type: DataTypes.STRING
            },
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