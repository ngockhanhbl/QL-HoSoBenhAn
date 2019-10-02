import Api from '@/services/Api'

export default {
  sendRequestSupport (payload) {
    return Api().post('sendRequestSupport', payload)
  },
  getAllFeedback () {
    return Api().get(`getAllFeedback`)
  },
}

