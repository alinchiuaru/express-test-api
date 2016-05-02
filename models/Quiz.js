module.exports = function (sequelize, DataTypes) {
    var Quiz = sequelize.define(
        'Quiz', {
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
                associate:function(models) {
                    Quiz.belongsTo(models.Course, { foreignKey: 'courseId'} );
                    Quiz.hasMany(models.Question, { foreignKey: 'id'} );
                }
            }
        }
    );

    return Quiz;
};