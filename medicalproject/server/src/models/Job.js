module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        type:{
            type:DataTypes.STRING,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        location:DataTypes.TEXT,
        status:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },

    })
    return Job
}