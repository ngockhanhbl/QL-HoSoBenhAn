const {Account} = require('../models')


module.exports = {
  async getAllAcountHospitals (req, res) {
      if(req.user.roles == 0){
      try {
        const roles = await Account.findAll({
          where:{
            roles: 2
          }
        })      
        res.send(roles)
        } catch (err) { 
          res.status(500).send({                   
            error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh viện '+err
          })
        }
      }
      else{
        res.status(500).send({                   
          error: 'Bạn không có quyền truy cập vào tài nguyên này '
        })
      }
    },
    async getAllAcountDoctors (req, res) {
      const payload = JSON.parse(req.query.payload)
      if(payload.roles === 2){
      try {
        const account = await Account.findAll({
          where:{
            id: payload.id_account
          }
        })      
        res.send(account)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi '+err
        })
      }
    }else{
      res.status(404).send('Assess Denied')
    }
    },
    async getAllRegisterAcountHospitals (req, res) {
      if(req.params.roles == 0){
      try {
        const roles = await Account.findAll({
          where:{
            roles: 2
          }
        })      
        res.send(roles)
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu bản ghi bệnh viện '+err
        })
      }
      }
      else{
        
      }
    },
    async forgotPassword (req, res) {
      try {
        const API_KEY = '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';
        const {email,password,api_key} = req.body;
        console.log(email)
        console.log(password)
        console.log(api_key)
        if(api_key != API_KEY){
          res.status(500).send({
            error: 'Authentication Denied'
          })
        }else{
          await Account.findOne(
            {
              where: {email: email}
          }).then(function (record) {
            return record.update({password: password});
          }).then(function (record) {
              res.sendStatus(200);
          });
        }
      } catch (err) {
        res.status(500).send({
          error: 'Xảy ra lỗi trong quá trình cập nhật password'+err
        })
      }
    },
}

