const {AlternativeRecord} = require('../models')
const {PatientRecords} = require('../models')

module.exports = {
    async saveAlternativeRecords (req, res) {
      try {
        const {objects_files, describe, id_record, length} = req.body
        for(let i = 0; i<length; i++){
            const recordDrug = await AlternativeRecord.bulkCreate([
              {id_record:id_record, describe:describe, image:objects_files[i].image},
            ], { validate: true }).catch(function(errors) {
            })
        }
        res.status(200).send('success ');
      } catch (err) {
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình tao dữ liệu bản ghi bệnh nhân '+err
        })
      }
    },

    async get_AlternativeRecord (req, res) {
      try {
        const records = await PatientRecords.findAll({       
          where:{
            id_patient: req.params.id_patient
          } 
        })
       
        var Payload = [];
        var index = 0;

        for(let i = 0; i<records.length; i++){
          let AlternativeRecordTable = await AlternativeRecord.findAll({
            where:{
              id_record: records[i].id
            } 
          })
          
          if(AlternativeRecordTable.length){
            Payload[index] = AlternativeRecordTable;
            index++;
          }
        }
         res.send(Payload)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh nhân '+ err
        })
      }
    },

}