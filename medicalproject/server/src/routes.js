const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const PatientsController = require('./controllers/PatientsController')
const HospitalsController = require('./controllers/HospitalsController')
const DoctorsController = require('./controllers/DoctorsController')
const DrugController = require('./controllers/DrugController')
const AccountController = require('./controllers/AccountController')
const AlternativeRecordsController = require('./controllers/AlternativeRecordsController')
const AdminController = require('./controllers/AdminController')

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

    app.get('/patient_records/:id_patient',
    PatientsController.show),

    app.post('/patient_records',
    PatientsController.post),

    app.get('/getInfoPatient/:id_patient',
    PatientsController.getInfoPatient),


    app.get('/doctor_records/:id_hospital',
    HospitalsController.show),

    app.put('/hospitals/:id_account',
    AuthenticationControllerPolicy.updatedEmail,
    HospitalsController.put)

    app.delete('/hospitals/:id_account',
    HospitalsController.remove)
    
    app.get('/getAllHospitals/:roles',
    HospitalsController.getAllHospitals)

    app.get('/getAllRegisterHospitals/:roles',
    HospitalsController.getAllRegisterHospitals)

    
    app.get('/getAllAcountHospitals/:roles',
    AccountController.getAllAcountHospitals)

    app.get('/getAllAcountDoctors/:id_hospital',
    AccountController.getAllAcountDoctors)

    app.get('/getAllRegisterAcountHospitals/:roles',
    AccountController.getAllRegisterAcountHospitals)


    //update hospital by admin

    app.put('/updateNameHospital/:id_account',
    AuthenticationControllerPolicy.updateNameHospital,
    AdminController.updateNameHospital)

    app.put('/updatePhoneHospital/:id_account',
    AuthenticationControllerPolicy.updatePhoneHospital,
    AdminController.updatePhoneHospital)

    app.put('/updateAddressHospital/:id_account',
    AdminController.updateAddressHospital)


    app.put('/updateEmailHospital/:id_account',
    AuthenticationControllerPolicy.updateEmailHospital,
    AdminController.updateEmailHospital)

    app.put('/updatePasswordHospital/:id_account',
    AuthenticationControllerPolicy.updatePasswordHospital,
    AdminController.updatePasswordHospital)

    app.delete('/deleteHospital/:id_account',
    AdminController.deleteHospital)

    app.delete('/refuseRegiterHospital/:email',
    AdminController.refuseRegiterHospital)



    //update infomation patient by patient
    app.put('/updateFirstNamePatient/:id_account',
    AuthenticationControllerPolicy.updateFirstNamePatient,
    PatientsController.updateFirstNamePatient)

    app.put('/updateLastNamePatient/:id_account',
    AuthenticationControllerPolicy.updateLastNamePatient,
    PatientsController.updateLastNamePatient)

    app.put('/updateDayPatient/:id_account',
    PatientsController.updateDayPatient)

    app.put('/updateMonthPatient/:id_account',
    PatientsController.updateMonthPatient)
    
    app.put('/updateYearPatient/:id_account',
    PatientsController.updateYearPatient)

    app.put('/updateSexPatient/:id_account',
    PatientsController.updateSexPatient)

    app.put('/updateAddressPatient/:id_account',
    PatientsController.updateAddressPatient)

    app.put('/updateRightPatient/:id_account',
    PatientsController.updateRightPatient)

    // app.put('/updateCmndPatient/:id_account',
    // PatientsController.updateCmndPatient)

    app.put('/updateEmailPatient/:id_account',
    AuthenticationControllerPolicy.updateEmailPatient,
    PatientsController.updateEmailPatient)

    app.put('/updatePasswordPatient/:id_account',
    AuthenticationControllerPolicy.updatePasswordPatient,
    PatientsController.updatePasswordPatient)


   // update info doctor by hospital
   app.put('/updateFirstNameDoctor/:id_account',
   AuthenticationControllerPolicy.updateFirstNameDoctor,
   HospitalsController.updateFirstNameDoctor)

   app.put('/updateLastNameDoctor/:id_account',
   AuthenticationControllerPolicy.updateLastNameDoctor,
   HospitalsController.updateLastNameDoctor)

   app.put('/updateAddressDoctor/:id_account',
   HospitalsController.updateAddressDoctor)

   app.put('/updateEmailDoctor/:id_account',
   AuthenticationControllerPolicy.updateEmailDoctor,
   HospitalsController.updateEmailDoctor)

   app.put('/updatePasswordDoctor/:id_account',
   AuthenticationControllerPolicy.updatePasswordDoctor,
   HospitalsController.updatePasswordDoctor)

   

   app.put('/updateDepartmentDoctor/:id_account',
   AuthenticationControllerPolicy.updateDepartmentDoctor,
   HospitalsController.updateDepartmentDoctor)

   app.put('/updateSpecializeDoctor/:id_account',
   AuthenticationControllerPolicy.updateSpecializeDoctor,
   HospitalsController.updateSpecializeDoctor)

   app.put('/updateCmndDoctor/:id_account',
   AuthenticationControllerPolicy.updateCmndDoctor,
   HospitalsController.updateCmndDoctor)

   app.put('/updatePhoneDoctor/:id_account',
   AuthenticationControllerPolicy.updatePhoneDoctor,
   HospitalsController.updatePhoneDoctor)

   app.put('/updateSexDoctor/:id_account',
   AuthenticationControllerPolicy.updateSexDoctor,
   HospitalsController.updateSexDoctor)

   app.put('/updateBirthdayDoctor/:id_account',
   AuthenticationControllerPolicy.updateBirthdayDoctor,
   HospitalsController.updateBirthdayDoctor)

}
