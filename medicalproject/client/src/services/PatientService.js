import Api from '@/services/Api'

export default {
  show (id_patient) {
    return Api().get(`patient_records/${id_patient}`)
  },
  getInfoPatient (id_patient) {
    return Api().get(`getInfoPatient/${id_patient}`)
  },
  get_nameDoctorRecordPatient (Arrayid_doctor) {
    return Api().get('get_nameDoctorRecordPatient', {
      params: Arrayid_doctor
    })
  },
  post (patient_record) {
    return Api().get('patient_records', patient_record)
  },
  get_DrugRecordPatient () {
    return Api().get('index')
  },
  get_AlternativeRecord (id_patient) {
    return Api().get(`get_AlternativeRecord/${id_patient}`)
  },
  getInfoGeneralPatient(id_patient) {
    return Api().get(`getInfoGeneralPatient/${id_patient}`)
  },


  updatePasswordPatient (patient) {
    return Api().put(`updatePasswordPatient/${patient.id_account}`, patient)
  },
  updateEmailPatient (patient) {
    return Api().put(`updateEmailPatient/${patient.id_account}`, patient)
  },
  updateDayPatient (patient) {
    return Api().put(`updateDayPatient/${patient.id_account}`, patient)
  },
  updateMonthPatient (patient) {
    return Api().put(`updateMonthPatient/${patient.id_account}`, patient)
  },
  updateYearPatient (patient) {
    return Api().put(`updateYearPatient/${patient.id_account}`, patient)
  },
  updateSexPatient (patient) {
    return Api().put(`updateSexPatient/${patient.id_account}`, patient)
  },
  updateRightPatient (patient) {
    return Api().put(`updateRightPatient/${patient.id_account}`, patient)
  },
  updateAddressPatient (patient) {
    return Api().put(`updateAddressPatient/${patient.id_account}`, patient)
  },
  updateFirstNamePatient (patient) {
    return Api().put(`updateFirstNamePatient/${patient.id_account}`, patient)
  },
  updateLastNamePatient (patient) {
    return Api().put(`updateLastNamePatient/${patient.id_account}`, patient)
  },
  updatePhonePatient (patient) {
    return Api().put(`updatePhonePatient/${patient.id_account}`, patient)
  },
  changePassword(doctor) {
    return Api().put(`updatePasswordDoctor/${doctor.id_account}`, doctor)
  },
}
