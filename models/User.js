var cryptoMD5 = require('crypto-js/md5');

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

    //before create hash the password
    User.beforeCreate(function(user, options) {
        user.password = cryptoMD5(user.password).toString();
    });

    return User;
};