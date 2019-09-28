module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define('Hospital', {
        id_account:{
            type:DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name_hospital:{
            type:DataTypes.STRING,
            allowNull: false
        },
        phone_hospital:{
            type:DataTypes.STRING,
            allowNull: false
        },
        address_hospital:{
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    return Hospital
}