module.exports = (sequelize, DataTypes) => {
    const AlternativeRecord = sequelize.define('AlternativeRecord', {
        id_record:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        describe:DataTypes.TEXT,
        image:{
            type:DataTypes.BLOB,
        }
    })
    return AlternativeRecord
}