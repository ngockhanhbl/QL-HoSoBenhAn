module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false
        },
        message:{
            type:DataTypes.TEXT,
            allowNull: false
        },
        status:{
            type:DataTypes.INTEGER,
        },
    })
    return Feedback
}