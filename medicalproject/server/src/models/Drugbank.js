module.exports = (sequelize, DataTypes) => {
    const Drugbank = sequelize.define('Drugbank', {
        id_hospital:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        tenThuoc:{
            type:DataTypes.STRING,
            allowNull: false
        },
        hoatChat:{
            type:DataTypes.STRING,
            allowNull: false
        },
        baoChe:{
            type:DataTypes.STRING,
            allowNull: false
        },
        nongDo:{
            type:DataTypes.STRING,
            allowNull: false
        },
        tuoiTho:{
            type:DataTypes.STRING,
            allowNull: false
        },
        congtySx:{
            type:DataTypes.STRING,
            allowNull: false
        },

    })

    return Drugbank
}