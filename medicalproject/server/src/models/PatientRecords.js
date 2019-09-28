
module.exports = (sequelize, DataTypes) => {
    const PatientRecords = sequelize.define('PatientRecords', {
        id_patient:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        id_doctor:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        patient_title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        patient_location:{
            type:DataTypes.STRING,
            allowNull: false
        },
        patient_time:{
            type:DataTypes.STRING,
            allowNull: false
        },
        patient_content:DataTypes.TEXT,

    })

    return PatientRecords
}