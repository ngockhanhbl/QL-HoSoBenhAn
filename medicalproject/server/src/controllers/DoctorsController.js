const {Account} = require('../models')
const {Patient} = require('../models')
const {Doctor} = require('../models')
const {Drug} = require('../models')

module.exports = {
    async getUserRecords (req, res) {
      try {
        const {email, right} = req.query
        const user = await Account.findOne({
          where: {
            email: email
          }
        })
        
        if (!user) {
          return res.status(403).send({
            error: 'Thông tin username không chính xác'
          })
        }
        const id = user.id
    
        const patient = await Patient.findOne({    
          where: {
            id_account: id
          }
        })
        if (!patient) {
          return res.status(403).send({
            error: 'Thông tin username chưa được cập nhật !'
          })
        }
        if(patient.right === ''){
          const patientJson = patient.toJSON();
          res.send(patientJson)
        }
        else{
          if(patient.right == right){
            const patientJson = patient.toJSON();
            res.send(patientJson)
          }
          else {
            return res.status(403).send({
              error: 'Quyền truy cập bị từ chối'
            })
          }
        }
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bệnh nhân' +err
        })
      }
    },
    async getInfoDoctor (req, res) {
      try { 
        const id_account  = req.query[0]
        const user = await Doctor.findOne({       
          where: {
            id_account: id_account
          }
        })
        
        if (!user) {
          return res.status(403).send({
            error: 'Thông tin id không chính xác'
          })
        }
        const userJson = user.toJSON();
        res.send(userJson)

      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bệnh nhân' +err
        })
      }
    },

    async saveDrugRecord (req, res) {
      try {
        const {objects_drug,length} = req.body
        for(let i = 0; i<length; i++){
            const recordDrug = await Drug.bulkCreate([
              objects_drug[i]
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

}