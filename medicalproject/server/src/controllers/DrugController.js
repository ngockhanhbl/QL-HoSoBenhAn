const {Drug} = require('../models')
module.exports = {
    async get_DrugRecordPatient (req, res) {
      try {
        const drugs = await Drug.findAll({
          attributes: ['id','id_record','name','total','morning','midday','afternoon','night',"note"],
          where: {
            
            // where: {
             
            // }
          }
        }).map(el => el.get({ plain: true }))
          // const drugs = await Drug.findAll({
          //   limit: 100
          // })
        //  const drugsJson = JSON.stringify(drugs)
        res.send(drugs)
      } catch (err) {
        res.status(500).send({
          error: 'xãy ra lỗi trong quá trình lấy dữ liệu thuốc' +err
        })
      }
    },
}