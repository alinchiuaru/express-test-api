module.exports = function (sequelize, DataTypes) {
    var Course = sequelize.define(
        'Course', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            title: {
                type: DataTypes.STRING,
                unique: true
            },

            description: {
                type: DataTypes.STRING
            },

            logo: {
                type: DataTypes.STRING
            }
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