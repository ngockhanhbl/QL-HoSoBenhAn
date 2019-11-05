const {PatientRecords} = require('../models')
const {Doctor} = require('../models')
const {Patient} = require('../models')
module.exports = {
    async show (req, res) {
      try {
        const records = await PatientRecords.findAll({       
          where:{
            id_patient: req.params.id_patient
          } 
        })      
        res.send(records)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh nhân '+err
        })
      }
    },

    async getInfoPatient (req, res) {
      try {
        const patient = await Patient.findOne({
          attributes: ['id_account', 'firstname','lastname','day','month','year','sex','phone','address','cmnd','right'],
          where:{
            id_account: req.params.id_patient
          }
        })
        // const patientJson = patient.toJSON();

        res.send(patient)

      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh nhân '+err
        })
      }
    },
    async getInfoGeneralPatient(req, res) {
      try {
        const patient = await Patient.findOne({
          attributes: [ 'firstname','lastname','day','month','year','sex','address'],
          where:{
            id_account: req.params.id_patient
          }
        })
        res.send(patient)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh nhân '+err
        })
      }
    },

    async post (req, res) {
      try {
        const record = await PatientRecords.create(req.body)
        res.send(record)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình tao dữ liệu bản ghi bệnh nhân '+err
        })
      }
    },
    async get_nameDoctorRecordPatient (req, res) {
      try { 
        const id_doctor  = req.query.id_doctor

        const user = await Doctor.findAll({
          attributes: ['firstname','lastname','id_account'],
          where: {
            id_account: id_doctor
          }
        }).map(el => el.get({ plain: true }))
            
        if (!user) {
          return res.status(403).send({
            error: 'Thông tin id không chính xác'
          })
        }

        // const userJson = JSON.stringify(user);
        res.send(user)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bác sĩ' +err
        })
      }
    },
    async updateFirstNamePatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({firstname: req.body.first_name});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật họ và tên lót'
        })
      }
    },
    async updateLastNamePatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({lastname: req.body.last_name});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật tên'
        })
      }
    },
  
    async updatePhonePatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({phone: req.body.phone});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật số điện thoại'
        })
      }
    },
    async updateDayPatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({day: req.body.day});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật số điện thoại'
        })
      }
    },
    async updateMonthPatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({month: req.body.month});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật số điện thoại'
        })
      }
    },
    async updateYearPatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({year: req.body.year});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật số điện thoại'
        })
      }
    },
    async updateAddressPatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({address: req.body.address});
        }).then(function (record) {
            res.sendStatus(200);
        });
      } catch (err) {
        res.status(500).send({
          error: 'Xảy ra lỗi trong quá trình cập nhật địa chỉ '
        })
      }
    },
    async updateSexPatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({sex: req.body.sex});
        }).then(function (record) {
            res.sendStatus(200);
        });
      } catch (err) {
        res.status(500).send({
          error: 'Xảy ra lỗi trong quá trình cập nhật gioi tinh '
        })
      }
    },
    async updateRightPatient (req, res) {
      try {
        await Patient.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({right: req.body.right});
        }).then(function (record) {
            res.sendStatus(200);
        });
      } catch (err) {
        res.status(500).send({
          error: 'Xảy ra lỗi trong quá trình cập nhật quyen truy cap '
        })
      }
    },

    async updateEmailPatient (req, res) {
      try {
        await Account.findOne(
          {
            where: {id: req.body.id_account}
        }).then(function (record) {
          return record.update({email: req.body.email});
        }).then(function (record) {
            res.sendStatus(200);
        });
      } catch (err) {
        res.status(500).send({
          error: 'Tài khoản email đã tồn tại! bạn có chắc tài khoản email của mình ?'
        })
      }
    },
    async updatePasswordPatient (req, res) {
      try {
        await Account.findOne(
          {
            where: {id: req.body.id_account}
        }).then(function (record) {
          return record.update({password: req.body.password});
        }).then(function (record) {
            res.sendStatus(200);
        });
        
      } catch (err) {
        res.status(500).send({
          error: 'Xảy ra lỗi trong quá trình cập nhật password'+err
        })
      }
    },
}