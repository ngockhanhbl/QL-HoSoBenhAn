const {Account} = require('../models')
const {Hospital} = require('../models')
const {HospitalRegister} = require('../models')
const {Doctor} = require('../models')
const {Feedback} = require('../models')
const {Job} = require('../models')
const {JobDetails} = require('../models')
const {JobCV} = require('../models')

module.exports = {
  async updateNameHospital (req, res) {
    if(req.user.roles == 0){
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
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },

  async updatePhoneHospital (req, res) {
    if(req.user.roles == 0){
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
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async updateAddressHospital (req, res) {
    if(req.user.roles == 0){
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
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async updateEmailHospital (req, res) {
    if(req.user.roles == 0){
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
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async updatePasswordHospital (req, res) {
    if(req.user.roles == 0 || (req.user.roles == 2 && req.user.id == req.body.id_account )){
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
          error: 'Xảy ra lỗi trong quá trình cập nhật password '+err
        })
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },

  async deleteHospital (req, res) {
    if(req.user.roles == 0){
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
          error: 'có lỗi xãy ra '+err
        })
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }

  },
  async refuseRegiterHospital (req, res) {
    if(req.user.roles == 0){
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
          error: 'có lỗi xảy ra '+err
        })
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async getAllFeedback (req, res) {
    if(req.user.roles == 0){

      try {
        await Feedback.findAll({
            where: {
              status: 0
            }
        }).then((feedback) => {
          res.send(JSON.stringify(feedback))
        })
      } catch (err) {
        res.status(500).send({
          error: 'có lỗi xảy ra '
        })
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async markToSupportDone (req, res) {
    if(req.user.roles == 0){
      try {
        await Feedback.findOne(
          {
            where: {id: req.body.id}
        }).then(function (record) {
          return record.update({status: 1});
        }).then(function (record) {
          res.status(200).send({
            message:'cập nhật thành công'
          })
          
        });
      } catch (err) {
        res.status(500).send({
          error: 'có lỗi xãy ra trong quá trình cập nhập dữ liệu'
        })
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async getAllJobs (req, res) {
      try {
        const jobs = await Job.findAll()
        res.status(200).send(
          jobs
        )
      } catch (err) {
        res.status(500).send({
          error: 'có lỗi xãy ra trong quá trình lấy dữ liệu'+err
        })
      }
  },
  async getAllJobDetails (req, res) {
      try {
        const jobdetails = await JobDetails.findAll()
        res.status(200).send(
          jobdetails
        )
      } catch (err) {
        res.status(500).send({
          error: 'có lỗi xãy ra trong quá trình lấy dữ liệu'+err
        })
      }
  },
  async getJobCVbyID(req, res) {
    try {
      if(req.user.roles == 0){
        if(req.params.id){
          const jobcv = await JobCV.findAll({
            where:{
              IdJob: req.params.id
            }
          }).map(el => el.get({ plain: true }))
          console.log(jobcv)
          res.status(200).send(
            {
              jobcv:jobcv
            }
          )
        }else{
          res.status(500).send({
            error: 'Filed can not empty!!!'
          })
        }
        
      }else{
        res.status(500).send({
          error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'có lỗi xãy ra trong quá trình lấy dữ liệu'+err
      })
    }
  },
  async getJobById (req, res) {
    try {
      if(req.params.id){
        const job = await Job.findOne({
          where:{
            id: req.params.id
          }
        }).then(x=>x.toJSON())

        const jobdetails = await JobDetails.findOne({
          where:{
            IdJob: req.params.id
          }
        }).then(x=>x.toJSON())
        console.log(job)
        console.log(jobdetails)
        res.status(200).send(
          {
            job:job,
            jobdetails:jobdetails
          }
        )
      }else{
        res.status(500).send({
          error: 'Filed can not empty!!!'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'có lỗi xãy ra trong quá trình lấy dữ liệu'+err
      })
    }
  },
  async SendRequestCreateJob (req, res) {
    var idjob;
    if(req.user.roles == 0){
      const {type,name,location,description,benefit,requirement} = req.body;
      if(!type || !name || !location || !description || !benefit || !requirement){
        res.status(500).send({
          error: 'Filed can not empty!!!'
        })
      }else{
        try {
          await Job.create(
            {
              type:type,
              name:name,
              location:location,
              status:0
          }).then(function (record) {
              idjob = record.id;
              JobDetails.create({
                IdJob:record.id,
                description:description,
                benefit:benefit,
                requirement:requirement
              })
          }).then(function (record) {
            res.status(200).send({
              message:'cập nhật thành công',
              payload:idjob
            })
          });
        } catch (err) {
          res.status(500).send({
            error: 'có lỗi xãy ra trong quá trình cập nhập dữ liệu'
          })
        }
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async SendRequestUpdateJob (req, res) {
    if(req.user.roles == 0){
      const {id,type,name,location,description,benefit,requirement} = req.body;
      if(!type || !name || !location || !description || !benefit || !requirement){
        res.status(500).send({
          error: 'Filed can not empty!!!'
        })
      }else{
        try {
          await Job.update({
            id:id,
            type:type,
            name:name,
            location:location,
          },
          {
            where:{id:id}
          }).then(function (record){
            JobDetails.update({
              IdJob:id,
              description:description,
              benefit:benefit,
              requirement:requirement
            },
            {where:{IdJob:id}})
          }).then(function (record){
            res.status(200).send({
              message:'cập nhật thành công',
            })
          })
        }catch (err) {
          res.status(500).send({
            error: 'có lỗi xãy ra trong quá trình cập nhập dữ liệu'
          })
        }
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async SwitchJobStatus (req, res) {
    if(req.user.roles == 0){
      if(!req.body.id){
        res.status(500).send({
          error: 'Filed can not empty!!!'
        })
      }else{
        try {
          const job = await Job.findOne({
            where:{id:req.body.id}
          })
          if(job){
            Job.update({
              status:!job.status
            },
            {where:{id:job.id}})
            .then(function(){
              res.status(200).send({
                message:'cập nhật thành công',
              })
            })
          }
        }catch (err) {
          res.status(500).send({
            error: 'có lỗi xãy ra trong quá trình cập nhập dữ liệu'+err
          })
        }
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
  async DeleteJob (req, res) {
    if(req.user.roles == 0){
      if(!req.params.id){
        res.status(500).send({
          error: 'Filed can not empty!!!'
        })
      }else{
        try {
          Job.destroy({
            where: {
              id:req.params.id
            }
          })
          JobDetails.destroy({
            where: {
              IdJob:req.params.id
            }
          })
          res.status(200).send({
            message:'xóa tin tuyển dụng thành công',
          })
        }catch (err) {
          res.status(500).send({
            error: 'có lỗi xãy ra trong quá trình cập nhập dữ liệu'+err
          })
        }
      }
    }else{
      res.status(500).send({
        error: 'bạn không có quyền truy cập vào tài nguyên này !!!'
      })
    }
  },
}

