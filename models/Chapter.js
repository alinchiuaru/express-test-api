module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define(
        'Chapter', {
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
                    Chapter.belongsTo(models.Course, { foreignKey: 'courseId'} );
                    Chapter.hasMany(models.Lesson, { foreignKey: 'id'} );
                }
            }
        }
    );

    return Chapter;
};