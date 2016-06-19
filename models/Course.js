module.exports = function (sequelize, DataTypes) {
    var Course = sequelize.define(
        'Course', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                unique: true
            },

            description: {
                type: DataTypes.STRING
            },
        },
        {
            classMethods:{
                associate:function(models) {
                    Course.hasMany(models.Chapter, { foreignKey: 'id'} );
                }
            }
        }
    );

    return Course;
};