module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            unique: true
        },

        password: {
            type: DataTypes.STRING
        },

        admin: {
            type: DataTypes.BOOLEAN
        }
    });

    //Hooks
    User.beforeCreate(function(user, options) {
        user.password = user.password + '--hook';
        // return hashPassword(user.password).then(function (hashedPw) {
        // user.password = hashedPw;
    });

    return User;
};