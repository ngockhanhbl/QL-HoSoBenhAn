const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PatientsController = require('./controllers/PatientsController')
const HospitalsController = require('./controllers/HospitalsController')
const DoctorsController = require('./controllers/DoctorsController')
const DrugController = require('./controllers/DrugController')
const AccountController = require('./controllers/AccountController')
const AlternativeRecordsController = require('./controllers/AlternativeRecordsController')
const AdminController = require('./controllers/AdminController')
const GeneralController = require('./controllers/GeneralController')
const isAuthenticated = require('./policies/isAuthenticated')
const email = require('./controllers/email')

module.exports = (app) => {
    app.get('/getUserRecords',
    DoctorsController.getUserRecords),

    app.get('/getInfoDoctor',
    DoctorsController.getInfoDoctor),

    app.get('/get_nameDoctorRecordPatient',
    PatientsController.get_nameDoctorRecordPatient),

    app.get('/get_DrugRecordPatient',
    DrugController.get_DrugRecordPatient),

    app.get('/getInfoHospital',
    HospitalsController.getInfoHospital),

    app.post('/saveRecord',
    PatientsController.post),

    app.post('/saveDrugRecord',
    DoctorsController.saveDrugRecord),

    app.post('/saveAlternativeRecords',
    AlternativeRecordsController.saveAlternativeRecords),

    app.get('/get_AlternativeRecord/:id_patient',
    AlternativeRecordsController.get_AlternativeRecord),

    app.post('/RegisterHospitalRequest',
    AuthenticationControllerPolicy.RegisterHospitalRequest,
    AuthenticationController.RegisterHospitalRequest),

    app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register),
    
    app.post('/patient',
    AuthenticationControllerPolicy.patient,
    AuthenticationController.patient),

    app.post('/hospital',
    AuthenticationControllerPolicy.hospital,
    AuthenticationController.hospital),

    app.post('/doctor',
    AuthenticationControllerPolicy.doctor,
    AuthenticationController.doctor),

    app.get('/getname',
    HospitalsController.getname),

    app.post('/login',
    AuthenticationController.login),

    app.get(`/patient_records/:id_patient`,
    isAuthenticated,
    PatientsController.show),

    app.post('/patient_records',
    isAuthenticated,
    PatientsController.post),

    app.get('/getInfoPatient/:id_patient',
    isAuthenticated,
    PatientsController.getInfoPatient),

    app.get('/getInfoGeneralPatient/:id_patient',
    isAuthenticated,
    PatientsController.getInfoGeneralPatient),


    app.put('/changePassword/:id',
    AuthenticationControllerPolicy.updatePasswordHospital,
    isAuthenticated,
    AdminController.updatePasswordHospital)


    app.get(`/getListDrugBank/:id`,
    isAuthenticated,
    HospitalsController.getListDrugBank)

    app.get('/doctor_records/:id_hospital',
    HospitalsController.show),

    app.put('/hospitals/:id_account',
    AuthenticationControllerPolicy.updatedEmail,
    HospitalsController.put)

    app.delete('/hospitals/:id_account',
    HospitalsController.remove)
    
    app.get('/getAllHospitals',
    isAuthenticated,
    HospitalsController.getAllHospitals)

    app.get('/getAllRegisterHospitals/:roles',
    HospitalsController.getAllRegisterHospitals)

    
    app.get('/getAllAcountHospitals/',
    isAuthenticated,
    AccountController.getAllAcountHospitals)

    app.get('/getAllAcountDoctors/:id_hospital',
    AccountController.getAllAcountDoctors)

    app.get('/getAllRegisterAcountHospitals/:roles',
    AccountController.getAllRegisterAcountHospitals)


    //update hospital by admin

    app.put('/updateNameHospital/:id_account',
    AuthenticationControllerPolicy.updateNameHospital,
    isAuthenticated,
    AdminController.updateNameHospital)

    app.put('/updatePhoneHospital/:id_account',
    AuthenticationControllerPolicy.updatePhoneHospital,
    isAuthenticated,
    AdminController.updatePhoneHospital)

    app.put('/updateAddressHospital/:id_account',
    isAuthenticated,
    AdminController.updateAddressHospital)


    app.put('/updateEmailHospital/:id_account',
    AuthenticationControllerPolicy.updateEmailHospital,
    isAuthenticated,
    AdminController.updateEmailHospital)

    app.put('/updatePasswordHospital/:id_account',
    AuthenticationControllerPolicy.updatePasswordHospital,
    isAuthenticated,
    AdminController.updatePasswordHospital)

    app.delete('/deleteHospital/:id_account',
    isAuthenticated,
    AdminController.deleteHospital)

    app.delete('/refuseRegiterHospital/:email',
    isAuthenticated,
    AdminController.refuseRegiterHospital)



    //update infomation patient by patient
    app.put('/updateFirstNamePatient/:id_account',
    isAuthenticated,
    AuthenticationControllerPolicy.updateFirstNamePatient,
    PatientsController.updateFirstNamePatient)

    app.put('/updateLastNamePatient/:id_account',
    isAuthenticated,
    AuthenticationControllerPolicy.updateLastNamePatient,
    PatientsController.updateLastNamePatient)

    app.put('/updateDayPatient/:id_account',
    isAuthenticated,
    PatientsController.updateDayPatient)

    app.put('/updateMonthPatient/:id_account',
    isAuthenticated,
    PatientsController.updateMonthPatient)
    
    app.put('/updateYearPatient/:id_account',
    isAuthenticated,
    PatientsController.updateYearPatient)

    app.put('/updateSexPatient/:id_account',
    isAuthenticated,
    PatientsController.updateSexPatient)

    app.put('/updateAddressPatient/:id_account',
    isAuthenticated,
    PatientsController.updateAddressPatient)

    app.put('/updateRightPatient/:id_account',
    isAuthenticated,
    PatientsController.updateRightPatient)

    // app.put('/updateCmndPatient/:id_account',
    // PatientsController.updateCmndPatient)

    app.put('/updateEmailPatient/:id_account',
    isAuthenticated,
    AuthenticationControllerPolicy.updateEmailPatient,
    PatientsController.updateEmailPatient)

    app.put('/updatePasswordPatient/:id_account',
    isAuthenticated,
    AuthenticationControllerPolicy.updatePasswordPatient,
    PatientsController.updatePasswordPatient)


   // update info doctor by hospital
   app.put('/updateFirstNameDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateFirstNameDoctor,
   HospitalsController.updateFirstNameDoctor)

   app.put('/updateLastNameDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateLastNameDoctor,
   HospitalsController.updateLastNameDoctor)

   app.put('/updateAddressDoctor/:id_account',
   isAuthenticated,
   HospitalsController.updateAddressDoctor)

   app.put('/updateEmailDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateEmailDoctor,
   HospitalsController.updateEmailDoctor)

   app.put('/updatePasswordDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updatePasswordDoctor,
   HospitalsController.updatePasswordDoctor)

   app.post('/SendRequestCreateDrugbank/:id_hospital',
   isAuthenticated,
   HospitalsController.SendRequestCreateDrugbank)

   app.put('/SendRequestModifyDrug/:id_hospital',
   isAuthenticated,
   HospitalsController.SendRequestModifyDrug)

   app.delete('/SendRequestDeleteDrug/:id',
   isAuthenticated,
   HospitalsController.SendRequestDeleteDrug)
   

   app.put('/updateDepartmentDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateDepartmentDoctor,
   HospitalsController.updateDepartmentDoctor)

   app.put('/updateSpecializeDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateSpecializeDoctor,
   HospitalsController.updateSpecializeDoctor)

   app.put('/updateCmndDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateCmndDoctor,
   HospitalsController.updateCmndDoctor)

   app.put('/updatePhoneDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updatePhoneDoctor,
   HospitalsController.updatePhoneDoctor)

   app.put('/updateSexDoctor/:id_account',
   isAuthenticated,
   AuthenticationControllerPolicy.updateSexDoctor,
   HospitalsController.updateSexDoctor)

   app.put('/updateBirthdayDoctor/:id_account',
   isAuthenticated,
   HospitalsController.updateBirthdayDoctor)

   app.post('/sendRequestSupport',
   AuthenticationControllerPolicy.sendRequestSupport,
   GeneralController.sendRequestSupport)
   
   app.post('/sendRequestSubcriber',
   GeneralController.sendRequestSubcriber)

   app.post(`/applyjob/:id`,
   GeneralController.applyjob)

   app.get('/getAllFeedback',
   isAuthenticated,
   AdminController.getAllFeedback)

   
   app.put('/markToSupportDone/:id',
   isAuthenticated,
   AdminController.markToSupportDone)

   app.post(`/SendRequestCreateJob/`,
   isAuthenticated,
   AdminController.SendRequestCreateJob)
   
   app.put(`/SendRequestUpdateJob/`,
   isAuthenticated,
   AdminController.SendRequestUpdateJob)

   app.put(`/SwitchJobStatus/:id`,
   isAuthenticated,
   AdminController.SwitchJobStatus)

   app.delete(`/DeleteJob/:id`,
   isAuthenticated,
   AdminController.DeleteJob)
   
   app.get(`/getAllJobs/`,
   AdminController.getAllJobs)

   app.get(`/getJobById/:id`,
   AdminController.getJobById)

   app.get(`/getJobCVbyID/:id`,
   isAuthenticated,
   AdminController.getJobCVbyID)
   

   app.get(`/getAllJobDetails/`,
   AdminController.getAllJobDetails)
   
   app.post('/AuthenticationEmail',
   email.sendEmail)

   app.put('/forgotPassword',
   AccountController.forgotPassword)
   
}
