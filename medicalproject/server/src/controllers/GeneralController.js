const {Feedback} = require('../models')


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
}