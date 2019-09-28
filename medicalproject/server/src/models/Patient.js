const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return
      }

      return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(function (salt) {
      return bcrypt.hashAsync(user.password, salt, null)
    })
    .then(function (hash) {
      return user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        id_account:{
            type:DataTypes.INTEGER,
            allowNull: false,
            unique:true
        },
        firstname:DataTypes.STRING,
        lastname:DataTypes.STRING,
        day:DataTypes.INTEGER,
        month:DataTypes.INTEGER,
        year:DataTypes.INTEGER,
        sex:DataTypes.STRING,
        phone:DataTypes.STRING,
        address:DataTypes.STRING,
        cmnd:DataTypes.STRING,
        right:DataTypes.STRING,
        image:DataTypes.BLOB
    })
    return Patient
}
