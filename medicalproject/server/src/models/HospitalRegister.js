module.exports = (sequelize, DataTypes) => {
    const HospitalRegister = sequelize.define('HospitalRegister', {
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
        },
        email:{
            type:DataTypes.STRING,
            unique: true
        },
        password:DataTypes.STRING,
    })
    return HospitalRegister
}