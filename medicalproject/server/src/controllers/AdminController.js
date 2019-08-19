const {Account} = require('../models')
const {Hospital} = require('../models')
const {HospitalRegister} = require('../models')
const {Doctor} = require('../models')

module.exports = {
  async updateNameHospital (req, res) {
    try {
      await Hospital.findOne(
        {
          where: {id_account: req.body.id_account}
      }).then(function (record) {
        return record.update({name_hospital: req.body.name_hospital});
      }).then(function (record) {
          res.sendStatus(200);
      });


    } catch (err) {
      res.status(500).send({
        error: 'xảy ra lỗi trong quá trình cập nhật tên bệnh viện'
      })
    }
  },

  async updatePhoneHospital (req, res) {
    try {
      await Hospital.findOne(
        {
          where: {id_account: req.body.id_account}
      }).then(function (record) {
        return record.update({phone_hospital: req.body.phone_hospital});
      }).then(function (record) {
          res.sendStatus(200);
      });


    } catch (err) {
      res.status(500).send({
        error: 'xảy ra lỗi trong quá trình cập nhật số điện thoại'
      })
    }
  },
  async updateAddressHospital (req, res) {
    try {
      await Hospital.findOne(
        {
          where: {id_account: req.body.id_account}
      }).then(function (record) {
        return record.update({address_hospital: req.body.address_hospital});
      }).then(function (record) {
          res.sendStatus(200);
      });
    } catch (err) {
      res.status(500).send({
        error: 'Xảy ra lỗi trong quá trình cập nhật địa chỉ '
      })
    }
  },
  async updateEmailHospital (req, res) {
    try {
      await Account.findOne(
        {
          where: {id: req.body.id_account}
      }).then(function (record) {
        return record.update({email: req.body.email_hospital});
      }).then(function (record) {
          res.sendStatus(200);
      });
    } catch (err) {
      res.status(500).send({
        error: 'Tài khoản email đã tồn tại! bạn có chắc tài khoản email của mình ?'
      })
    }
  },
  async updatePasswordHospital (req, res) {
    try {
      await Account.findOne(
        {
          where: {id: req.body.id_account}
      }).then(function (record) {
        return record.update({password: req.body.password_hospital});
      }).then(function (record) {
          res.sendStatus(200);
      });
      
    } catch (err) {
      res.status(500).send({
        error: 'Xảy ra lỗi trong quá trình cập nhật password'+err
      })
    }
  },

  async deleteHospital (req, res) {
    try {
      const id_account = req.params.id_account

      const accountCheck = await Account.findOne({
        where: {
          id: id_account
        }
      })

      if (!accountCheck) {
          return res.status(403).send({
            error: 'không tìm thấy thông tin cần xóa'
        })
    }else{
      const doctor = await Doctor.findAll({
        where: {
          id_hospital: id_account
        }
      }).map(el => el.get({ plain: true }))

    Doctor.destroy({
          where: {
            id_hospital: id_account
          }
      })


  for(let i = 0; i<doctor.length; i++){
        const deleteAccountDoctor = await Account.destroy({
          where: {
            id: doctor[i].id_account
          }
        })
    }

      Hospital.destroy({
        where: {
          id_account: id_account
        }
    })

    Account.destroy({
      where: {
        id: id_account
      }
  })

        res.sendStatus(200);
      }
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the hospital '+err
      })
    }
  },
  async refuseRegiterHospital (req, res) {
    try {
      const email = req.params.email
      HospitalRegister.destroy({
          where: {
            email: email
          }
      })
      
        res.sendStatus(200);
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the hospital '+err
      })
    }
  }
}



