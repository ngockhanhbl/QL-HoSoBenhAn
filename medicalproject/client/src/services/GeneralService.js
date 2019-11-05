import Api from '@/services/Api'

export default {
  sendRequestSupport (payload) {
    return Api().post(`sendRequestSupport`, payload)
  },
  sendRequestSubcriber (payload) {
    return Api().post(`sendRequestSubcriber`, payload)
  },
  getAllFeedback () {
    return Api().get(`getAllFeedback`)
  },
  applyjob (payload) {
    return Api().post(`applyjob/${payload.IdJob}`, payload)
  },
}

