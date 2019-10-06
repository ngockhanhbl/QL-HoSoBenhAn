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
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email:{
            type:DataTypes.STRING,
            unique: true
        },
        password:DataTypes.STRING,
        isUpdateInformation:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        roles:DataTypes.INTEGER,
    },{
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            // beforeSave: hashPassword
        }
    })
    
    Account.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }
    return Account
}