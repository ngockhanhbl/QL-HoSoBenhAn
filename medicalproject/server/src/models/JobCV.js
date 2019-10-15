module.exports = (sequelize, DataTypes) => {
    const JobCV = sequelize.define('JobCV', {
        IdJob:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        comments:DataTypes.TEXT,
        file:DataTypes.BLOB,
    })
    return JobCV
}