import Api from '@/services/Api'

export default {
  getUserRecords (credentials) {
    return Api().get('getUserRecords', {
      params: credentials
    })
  },
  getInfoDoctor (credentials) {
    return Api().get('getInfoDoctor', {
      params: credentials
    })
  },
  saveRecord (payload) {
    return Api().post('saveRecord', payload)
  },
  saveDrugRecord (payload) {
    return Api().post('saveDrugRecord', payload)
  },
  saveAlternativeRecords (payload) {
    return Api().post('saveAlternativeRecords', payload)
  },
}

