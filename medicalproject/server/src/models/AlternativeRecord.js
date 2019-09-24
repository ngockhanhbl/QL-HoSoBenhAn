module.exports = (sequelize, DataTypes) => {
    const AlternativeRecord = sequelize.define('AlternativeRecord', {
        id_record:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'PatientRecords',
                key: 'id',
            }
        },
        describe:DataTypes.TEXT,
        image:{
            type:DataTypes.BLOB,
        }
    })
    return AlternativeRecord
}