const {Account} = require('../models')


module.exports = {
  async getAllAcountHospitals (req, res) {
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
}

