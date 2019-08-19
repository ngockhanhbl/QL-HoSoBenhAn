module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        id_hospital:{
            type:DataTypes.STRING,
            allowNull: false
        },
        id_account:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        department:{
            type:DataTypes.STRING,
            allowNull: false
        },
        specialize:{
            type:DataTypes.STRING,
            allowNull: false
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
    })
    return Doctor
}