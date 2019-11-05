const {Feedback} = require('../models')
const {SubcriberMail} = require('../models')
const {JobCV} = require('../models')


module.exports = {
    async sendRequestSupport (req, res) {
      try {
        const feedback = await Feedback.create(req.body)
        const feedbackJson = feedback.toJSON()
        res.send({feedback: feedbackJson})
      } catch (err) {
        res.status(400).send({
          error: 'Có lỗi xãy ra trong quá trình gửi hỗ trợ '
        })
      }
    },
    async applyjob(req, res){
      try {
        const jobcv = await JobCV.create(req.body)
        const jobcvJSON = jobcv.toJSON()
        res.send({jobcv: jobcvJSON})
      } catch (err) {
        res.status(400).send({
          error: 'Có lỗi xãy ra trong quá trình ứng tuyển '
        })
      }
    },
    async sendRequestSubcriber (req, res) {
      try {
        SubcriberMail
          .findOrCreate({where: {email:req.body.email}, defaults: {email: req.body.email}})
          .then(([user, created]) => {
            console.log(user.get({
              plain: true
            }))
          })
        res.status(200).send({
          message: 'Cảm ơn bạn, email của bạn đã được ghi nhận '
        })
      } catch (err) {
        res.status(400).send({
          error: 'Có lỗi xãy ra trong quá trình gửi hỗ trợ '
        })
      }
    },
}

