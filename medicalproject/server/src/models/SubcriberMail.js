
module.exports = (sequelize, DataTypes) => {
    const SubcriberMail = sequelize.define('SubcriberMail', {
        email:{
            type:DataTypes.STRING,
            unique: true,
            allowNull:false
        },
    })
    return SubcriberMail
}