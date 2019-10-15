module.exports = (sequelize, DataTypes) => {
    const JobDetails = sequelize.define('JobDetails', {
        IdJob:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        description:DataTypes.TEXT,
        benefit:DataTypes.TEXT,
        requirement:DataTypes.TEXT,
    })
    return JobDetails
}