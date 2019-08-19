import Api from '@/services/Api'

export default {
  getAllAcountHospitals (roles) {
    return Api().get(`getAllAcountHospitals/${roles}`)
  },
  getAllAcountDoctors (payload) {
    return Api().get(`getAllAcountDoctors/${JSON.parse(payload.payload).id_hospital}`, {
      params: payload
    })
  },
  getAllRegisterAcountHospitals (roles) {
    return Api().get(`getAllRegisterAcountHospitals/${roles}`)
  },
}

