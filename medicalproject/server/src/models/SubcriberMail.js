
module.exports = (sequelize, DataTypes) => {
    const SubcriberMail = sequelize.define('SubcriberMail', {
        mail:{
            type:DataTypes.STRING,
        },
    })
    return SubcriberMail
}