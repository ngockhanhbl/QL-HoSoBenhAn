module.exports = (sequelize, DataTypes) => {
    const JobCV = sequelize.define('JobCV', {
        IdJob:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        comments:DataTypes.TEXT,
        phone:{
            type:DataTypes.STRING,
            allowNull: false
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false
        },
    })
    return JobCV
}