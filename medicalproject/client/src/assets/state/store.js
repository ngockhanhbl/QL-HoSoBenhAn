import Vue from "vue";
import Vuex from "vuex";
import FAQs from "./modules/faqs";
import Header from "./modules/header";
import Jobs from "./modules/jobs";
import Login from "./modules/login";
import RegisterPatient from "./modules/registerpatient";
import RegisterHospital from "./modules/registerhospital";
import Doctor from "./modules/doctor";
import Patient from "./modules/patient";
import General from "./modules/general";
import Hospital from "./modules/hospital";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    FAQs,
    Header,
    Jobs,
    Login,
    RegisterPatient,
    RegisterHospital,
    Doctor,
    Patient,
    General,
    Hospital
  }
});
