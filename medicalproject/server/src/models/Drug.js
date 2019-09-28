module.exports = (sequelize, DataTypes) => {
    const Drug = sequelize.define('Drug', {
        id_record:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        name:DataTypes.STRING,
        total:DataTypes.INTEGER,
        morning:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        midday:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        afternoon:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        night:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        note:DataTypes.TEXT

    })

    return Drug
}