module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define(
        'Chapter', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            title: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.STRING
            },

            lectureNote: {
                type: DataTypes.TEXT('long')
            }
        },
        {
            classMethods:{
                associate:function(models) {
                    Chapter.belongsTo(models.Course, { foreignKey: 'courseId'} );
                    Chapter.hasMany(models.Lesson, { foreignKey: 'id'} );
                }
            }
        }
    );

    return Chapter;
};