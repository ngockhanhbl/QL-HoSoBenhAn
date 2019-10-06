import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  patient (credentials) {
    return Api().post('patient', credentials)
  },
  hospital (credentials) {
    return Api().post('hospital', credentials)
  },
  doctor (credentials) {
    return Api().post('doctor', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  registerHospital (credentials) {
    return Api().post('registerHospital', credentials)
  },
  RegisterHospitalRequest (credentials) {
    return Api().post('RegisterHospitalRequest', credentials)
  },
  AuthenticationEmail (credentials) {
    return Api().post('AuthenticationEmail', credentials)
  }
}

