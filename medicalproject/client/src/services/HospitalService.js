import Api from '@/services/Api'

export default {
  show (id_hospital) {
    return Api().get(`doctor_records/${id_hospital}`)
  },
  delete (id_account) {
    return Api().delete(`hospitals/${id_account}`)
  },
  put (hospital) {
    return Api().put(`hospitals/${hospitals.id_account}`, hospital)
  },
  getname (id) {
    return Api().get('getname', id)
  },
  getInfoHospital (payload) {
    return Api().get('getInfoHospital', {
      params: payload
    })
  },
  getAllHospitals () {
    return Api().get(`getAllHospitals`)
  },
  getAllRegisterHospitals (roles) {
    return Api().get(`getAllRegisterHospitals/${roles}`)
  },
  SendRequestCreateDrugbank(payload) {
    return Api().post(`SendRequestCreateDrugbank/${payload.id_hospital}`,payload)
  },
  SendRequestModifyDrug(payload) {
    return Api().put(`SendRequestModifyDrug/${payload.id_hospital}`,payload)
  },
  SendRequestDeleteDrug(payload) {
    return Api().delete(`SendRequestDeleteDrug/${payload.id}`,payload)
  },
  getListDrugBank (id) {
    return Api().get(`getListDrugBank/${id}`)
  },

  changePassword(hospital) {
    return Api().put(`changePassword/${hospital.id_account}`, hospital)
  },
  updateFirstNameDoctor (doctor) {
    return Api().put(`updateFirstNameDoctor/${doctor.id_account}`, doctor)
  },
  updateLastNameDoctor (doctor) {
    return Api().put(`updateLastNameDoctor/${doctor.id_account}`, doctor)
  },
  updateAddressDoctor (doctor) {
    return Api().put(`updateAddressDoctor/${doctor.id_account}`, doctor)
  },
  updateEmailDoctor (doctor) {
    return Api().put(`updateEmailDoctor/${doctor.id_account}`, doctor)
  },
  updatePasswordDoctor (doctor) {
    return Api().put(`updatePasswordDoctor/${doctor.id_account}`, doctor)
  },

  updateDepartmentDoctor (doctor) {
    return Api().put(`updateDepartmentDoctor/${doctor.id_account}`, doctor)
  },
  updateSpecializeDoctor (doctor) {
    return Api().put(`updateSpecializeDoctor/${doctor.id_account}`, doctor)
  },
  updateCmndDoctor (doctor) {
    return Api().put(`updateCmndDoctor/${doctor.id_account}`, doctor)
  },
  updatePhoneDoctor (doctor) {
    return Api().put(`updatePhoneDoctor/${doctor.id_account}`, doctor)
  },
  updateSexDoctor (doctor) {
    return Api().put(`updateSexDoctor/${doctor.id_account}`, doctor)
  },
  updateBirthdayDoctor (doctor) {
    return Api().put(`updateBirthdayDoctor/${doctor.id_account}`, doctor)
  },
  
}

