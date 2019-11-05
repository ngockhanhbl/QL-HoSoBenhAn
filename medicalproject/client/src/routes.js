import Home from "./components/Home";
const Login = () => import ("./components/content/Login");
const FAQs = () => import ("./components/content/FAQs");
const Jobs = () => import ("./components/content/Jobs");
const JobDetails = () => import ("./components/content/JobDetails");
const Aboutus = () => import ("./components/content/Aboutus");
const RegisterHospital = () => import ("./components/content/RegisterHospital");
const RegisterPatient = () => import ("./components/content/RegisterPatient");
const Terms = () => import ("./components/content/Terms");
const Policy = () => import ("./components/content/Policy");
const Partner = () => import ("./components/content/Partner");
const Contact = () => import ("./components/content/Contact");
const Patient = () => import ("./components/content/Patient");
const Doctor = () => import ("./components/content/Doctor");
const Hospital = () => import ("./components/content/Hospital");
const Admin = () => import ("./components/content/Admin");
const AddDoctor = () => import ("./components/content/hospital_modules/AddDoctor");
const ChangeInfo = () => import ("./components/content/hospital_modules/ChangeInfo");
const UpdateInformationRegister = () => import ("./components/content/UpdateInformationRegister");
const Thanks = () => import ("./components/content/Thanks");
const SearchDrug = () => import ("./components/content/SearchDrug");
const DrugDetails = () => import ("./components/content/DrugDetails");
const PatientData = () => import ("./components/content/patient_modules/PatientData");
const DrugManagement = () => import ("./components/content/hospital_modules/DrugManagement");
 

export const routes = [
  // { path: "*", redirect:'home' },
  { path: "/", name: "homepage", component: Home },
  { path: "/faqs", name: "faqs", component: FAQs },
  { path: "/login", name: "login", component: Login },
  { path: "/jobs", name: "jobs", component: Jobs },
  { path: "/jobdetails/:id", name: "jobdetails", component: JobDetails },
  { path: "/aboutus", name: "aboutus", component: Aboutus },
  { path: "/registerhospital", name: "registerhospital", component: RegisterHospital },
  { path: "/registerpatient", name: "registerpatient", component: RegisterPatient },
  { path: "/Terms", name: "terms", component: Terms },
  { path: "/Policy", name: "policy", component: Policy },
  { path: "/Partner", name: "partner", component: Partner },
  { path: "/Contact", name: "contact", component: Contact },
  { path: "/Patient/:id", name: "patient", component: Patient },
  { path: "/Doctor", name: "doctor", component: Doctor },
  { path: "/Hospital/:id", name: "hospital", component: Hospital },
  { path: "/Hospital/:id/addDoctor", name: "addDoctor", component: AddDoctor },
  { path: "/Hospital/:id/ChangeInfo", name: "changeInfo", component: ChangeInfo },
  { path: "/Hospital/:id/DrugManagement", name: "DrugManagement", component: DrugManagement },
  { path: "/Admin", name: "admin", component: Admin },
  { path: "/Thanks", name: "thanks", component: Thanks },
  { path: "/SearchDrug", name: "searchdrug", component: SearchDrug },
  { path: "/DrugDetails/:id", name: "drugdetails", component: DrugDetails },
  { path: "/UpdateInformationRegister", name: "UpdateInformationRegister", component: UpdateInformationRegister },
  { path: "/PatientData", name: "patientdata", component: PatientData },

];
