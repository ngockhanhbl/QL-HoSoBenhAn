import Api from '@/services/Api'

export default {
  getAllAcountHospitals () {
    return Api().get(`getAllAcountHospitals`)
  },
  getAllAcountDoctors (payload) {
    return Api().get(`getAllAcountDoctors/${JSON.parse(payload.payload).id_hospital}`, {
      params: payload
    })
  },
  getAllRegisterAcountHospitals (roles) {
    return Api().get(`getAllRegisterAcountHospitals/${roles}`)
  },
  forgotPassword(payload){
    return Api().put(`forgotPassword`,payload)
  }
}

