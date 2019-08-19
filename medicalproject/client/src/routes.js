import Home from "./components/Home";
import Login from "./components/content/Login";
import FAQs from "./components/content/FAQs";
import Jobs from "./components/content/Jobs";
import Aboutus from "./components/content/Aboutus";
import RegisterHospital from "./components/content/RegisterHospital";
import RegisterPatient from "./components/content/RegisterPatient";
import Terms from "./components/content/Terms";
import Policy from "./components/content/Policy";
import Partner from "./components/content/Partner";
import Contact from "./components/content/Contact";
import Patient from "./components/content/Patient";
import Doctor from "./components/content/Doctor";
import Hospital from "./components/content/Hospital";
import Admin from "./components/content/Admin";
import AddDoctor from "./components/content/hospital_modules/AddDoctor";
import ChangeInfo from "./components/content/hospital_modules/ChangeInfo";
import Thanks from "./components/content/Thanks";
export const routes = [
  // { path: "*", redirect:'home' },
  { path: "/", name: "homepage", component: Home },
  { path: "/faqs", name: "faqs", component: FAQs },
  { path: "/login", name: "login", component: Login },
  { path: "/jobs", name: "jobs", component: Jobs },
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
  { path: "/Admin", name: "admin", component: Admin },
  { path: "/Thanks", name: "thanks", component: Thanks },
];
