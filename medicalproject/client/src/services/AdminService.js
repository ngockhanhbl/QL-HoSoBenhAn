import Api from '@/services/Api'

export default {
  updateNameHospital (hospital) {
    return Api().put(`updateNameHospital/${hospital.id_account}`, hospital)
  },
  updatePhoneHospital (hospital) {
    return Api().put(`updatePhoneHospital/${hospital.id_account}`, hospital)
  },
  updateAddressHospital (hospital) {
    return Api().put(`updateAddressHospital/${hospital.id_account}`, hospital)
  },
  updateEmailHospital (hospital) {
    return Api().put(`updateEmailHospital/${hospital.id_account}`, hospital)
  },
  updatePasswordHospital (hospital) {
    return Api().put(`updatePasswordHospital/${hospital.id_account}`, hospital)
  },
  deleteHospital (hospital) {
    return Api().delete(`deleteHospital/${hospital.id_account}`)
  },
  refuseRegiterHospital (hospital) {
    return Api().delete(`refuseRegiterHospital/${hospital.email}`)
  },
  markToSupportDone (payload) {
    return Api().put(`markToSupportDone/${payload.id}`, payload)
  },
}

