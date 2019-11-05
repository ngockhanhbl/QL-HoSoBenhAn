const {Doctor} = require('../models')
const {Account} = require('../models')
const {Hospital} = require('../models')
const {HospitalRegister} = require('../models')
const {Drugbank} = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const records = await Doctor.findAll({
        where:{
          id_hospital: req.params.id_hospital
        } 
      })      
      res.send(records)
    } catch (err) { 
      res.status(500).send({                   
        error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh nhân '
      })
    }
  },
  async put (req, res) {
    try {
      await Account.update(req.body, {
        where: {
          email: req.params.email
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the account'
      })
    }
  },
  async getname (req, res) {
    try {
      const name = await Hospital.findByPk(req.params.id)
      res.send(name.name_hospital)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured '
      })
    }
  },
  async remove (req, res) {
    try {
      const {id_account} = req.params
      const doctor = await Doctor.findOne({
        where: {
          id_account: id_account
        }
      })
      if (!doctor) {
        return res.status(403).send({
          error: 'you do not have access to this doctor'
        })
      }
      

      const account = await Account.findOne({
        where: {
          id: id_account
        }
      })
      if (!account) {
        return res.status(403).send({
          error: 'you do not have access to this account'
        })
      }

      await doctor.destroy()
      await account.destroy()
      res.send(doctor)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the doctor '+err
      })
    }
  },
  async getInfoHospital (req, res) {
    try { 
      const id_hospital  = req.query[0]
      const user = await Hospital.findOne({       
        where: {
          id_account: id_hospital
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
        error: 'xãy ra lỗi trong quá trình lấy dữ liệu bệnh viện ' +err
      })
    }
  },
  async getAllHospitals (req, res) {
      if(req.user.roles == 0){
        try {
          const hospital = await Hospital.findAll({

          })      
          res.send(hospital)
        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh viện '+err
          })
        }
      }
      else{
        res.status(500).send({                   
          error: 'Bạn không có quyền truy cập vào tài nguyên này !'
        })
      }
    },
    async getAllRegisterHospitals (req, res) {

      if(req.params.roles == 0){
      try {
        const hospital = await HospitalRegister.findAll({
          where:{
            
          }
        })      
        res.send(hospital)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh viện '+err
        })
      }
      }
      else{
        res.send('error')
      }
    },


    //update info doctor by hospital

    async updateFirstNameDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({firstname: req.body.firstname});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật họ và tên lót bác sĩ'
        })
      }
    },

    async updateLastNameDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({lastname: req.body.lastname});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật tên lót bác sĩ'
        })
      }
    },

    async updateAddressDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({address: req.body.address});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật địa chỉ bác sĩ'
        })
      }
    },
    async updatePhoneDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({phone: req.body.phone});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật số điện thoại bác sĩ'
        })
      }
    },
    async updateCmndDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({cmnd: req.body.cmnd});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật CMND bác sĩ'
        })
      }
    },
    async updateSexDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({sex: req.body.sex});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật giới tính'
        })
      }
    },
    async updateBirthdayDoctor (req, res) {
      try {
        const date = req.body.birthday;
        const yearVariable = date.slice(0, 4)
        const monthVariable = date.slice(5, 7)
        const dayVariable = date.slice(8, 10)

        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({day: dayVariable,month:monthVariable,year:yearVariable});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật giới tính'
        })
      }
    },
    async updateDepartmentDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({department: req.body.department});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật phòng ban bác sĩ'
        })
      }
    },
    async updateSpecializeDoctor (req, res) {
      try {
        await Doctor.findOne(
          {
            where: {id_account: req.body.id_account}
        }).then(function (record) {
          return record.update({specialize: req.body.specialize});
        }).then(function (record) {
            res.sendStatus(200);
        });
  
      } catch (err) {
        res.status(500).send({
          error: 'xảy ra lỗi trong quá trình cập nhật chuyên môn bác sĩ'
        })
      }
    },

    async updateEmailDoctor (req, res) {
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
          error: 'xảy ra lỗi trong quá trình cập nhật email bác sĩ'
        })
      }
    },

    async updatePasswordDoctor (req, res) {
      if(req.user.roles == 2 || (req.user.roles == 3 && req.user.id == req.body.id_account)){
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
            error: 'xảy ra lỗi trong quá trình cập nhật password bác sĩ'
          })
        }
      }else{
        res.status(500).send({
          error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
        })
      }

    },

    async SendRequestCreateDrugbank (req, res) {
      const {id_hospital,tenThuoc,hoatChat,baoChe,nongDo,tuoiTho,congTySx} = req.body
      if(req.user.roles == 2){
        try {
          const record = await Drugbank.create({
            id_hospital:id_hospital,
            tenThuoc:tenThuoc,
            hoatChat:hoatChat,
            baoChe:baoChe,
            nongDo:nongDo,
            tuoiTho:tuoiTho,
            congtySx:congTySx
          })
          res.send(record)
        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình tao dữ liệu thuốc '+err
          })
        }
      }else{
        res.status(500).send({
          error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
        })
      }
    },
  async SendRequestDeleteDrug(req, res) {
    try {
      const {id} = req.params;
      if(req.user.roles == 2){
        try {
          const check_owner = await Drugbank.findAll({
            where: {
              id_hospital :req.user.id,
              id:id
            }
          })
          if(!check_owner){
            res.status(500).send({                   
              error: 'bạn không có quyền truy cập vào tài nguyên này '
            })
          }else{
            try {
              Drugbank.destroy({
                where: {
                  id:id
                }
            })
            .then(function (record){
                res.status(200).send({
                  message:'xóa thành công',
                })
              })
            } catch (err) { 
              res.status(500).send({                   
                error: 'xãy ra lỗi trong quá trình tao dữ liệu thuốc '+err
              })
            }
          }

        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình xóa dữ liệu '+err
          })
        }
      }
      else{
        res.status(500).send({                   
          error: 'Bạn không có quyền truy cập vào tài nguyên này !'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'xãy ra lỗi trong quá trình xóa dữ liệu'+err
      })
    }
  },
    async SendRequestModifyDrug (req, res) {
      const {id, id_hospital, tenThuoc, hoatChat, baoChe, nongDo, tuoiTho, congTySx} = req.body
      if(req.user.roles == 2){
        const check_owner = await Drugbank.findAll({
          where: {
            id_hospital :req.user.id,
            id:id
          }
        })

      if(!check_owner){
        res.status(500).send({                   
          error: 'bạn không có quyền truy cập vào tài nguyên này '
        })
      }else{
        try {
         await Drugbank.update({
            tenThuoc:tenThuoc,
            hoatChat:hoatChat,
            baoChe:baoChe,
            nongDo:nongDo,
            tuoiTho:tuoiTho,
            congtySx:congTySx
          },
            {
              where: {
                id:id
              }
            }
          ).then(function (record){
            res.status(200).send({
              message:'cập nhật thành công',
            })
          })
        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình tao dữ liệu thuốc '+err
          })
        }
      }
      }else{
        res.status(500).send({
          error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
        })
      }
    },
    async getListDrugBank (req, res) {
      if(req.user.roles == 2){
        try {
          const record = await Drugbank.findAll({
              where: {
                id_hospital: req.user.id
              }
          }).map(el => el.get({ plain: true }))
          res.send(record)
        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình tao dữ liệu thuốc '+ err
          })
        }
      }else if(req.user.roles == 3){
        try {
          const doctor = await Doctor.findAll({
            where: {
              id_account : req.user.id
            }
          }).map(el => el.get({ plain: true }))
          const record = await Drugbank.findAll({
              where: {
                id_hospital: doctor[0].id_hospital
              }
          }).map(el => el.get({ plain: true }))
          res.send(record)
        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình tao dữ liệu thuốc '+ err
          })
        }
      }
      else{
        res.status(500).send({
          error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
        })
      }
    },
}

