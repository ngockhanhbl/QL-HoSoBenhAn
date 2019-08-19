
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
        patient_title:DataTypes.STRING,
        patient_location:DataTypes.STRING,
        patient_time:DataTypes.STRING,
        patient_content:DataTypes.TEXT,

    })

    return PatientRecords
}