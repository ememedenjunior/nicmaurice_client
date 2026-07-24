import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PublishArticle from "./Pages/Publish";
import Journal from "./Pages/Journal";
import Institute from "./Pages/Institute";
import Archive from "./Pages/Archive";
import ProfessionalJournal from "./Pages/journals/Professional";
import InnovationJournal from "./Pages/journals/Innovation";
import NursingJournal from "./Pages/journals/Nursing";
import WellspringJournal from "./Pages/journals/Wellspring";
import CommunityJournal from "./Pages/journals/Community";
import League from "./Pages/institute/League";
import InternationalNursingFoundation from "./Pages/institute/Foundation";
import HealthInstitute from "./Pages/institute/Health";
import Research from "./Pages/institute/Research";
import Multidisciplinary from "./Pages/journals/Multidisciplinary";
import About from "./components/About";
import Articles from "./Pages/Articles";
import SpecialtyCommunityJournal from "./Pages/journals/SpecialtyJournalCommunity";
import SpecialtyNursingJournal from "./Pages/journals/SpecialtyJournalNursing";
import Agriculture from "./Pages/institute/Agriculture";
import JANI from "./Pages/institute/Jani";
import IntegratedHealth from "./Pages/institute/IntegratedHealth";
import CommonwealthPage from "./Pages/institute/Commonwealth";
import ISJCHNR from "./Pages/journals/Isjchnr";
import NursingAcademy from "./Pages/institute/NursingAcademy";
import Maurice from "./Pages/institute/Maurice";
import CONE from "./Pages/institute/Cone";
import MentalHealthJournal from "./Pages/journals/MentalHealth";
import MidwiferyJournal from "./Pages/journals/global";
import ClinicalNursingJournal from "./Pages/journals/ClinicalNursingJournal";
import MedicalSurgicalNursingJournal from "./Pages/journals/MedicalSurgical";
import MaternalChildJournal from "./Pages/journals/MaternalJournal";
import NSUNProfilePage from "./Pages/journals/Nsu";
import ICVSPage from "./Pages/institute/Computer";
import { AcademyPage } from "./Pages/Academy";
import LoginPage from "./Pages/PortalLogin";
import ProtectedRoute from "./components/ProtectRoute";
import Applicant from "./Pages/Applicant";
import PortalDashboard from "./components/Student/PortalDashboard";
import NursingDepartment from "./components/Academy/NursingDepartment";
import AdmissionsSection from "./components/Academy/AcademicSection";
import AboutUsSection from "./components/Academy/About";
import AdmissionsDashboard from "./Pages/Admin/AdmissionOffer";
import Login from "./Pages/Admin/AdminLogin";
import TeacherLoginPage from "./components/Teacher/Login";
import TeacherDashboard from "./components/Teacher/TeacherPortal";
import HRDashboard from "./Pages/Admin/HrOfficer";
import Seminar from "./Pages/Seminar";
import RegistrarDashboard from "./Pages/Admin/Registrar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seminar" element={<Seminar />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route
          path="/academy/specializations"
          element={<NursingDepartment />}
        />
        <Route path="/academy/admissions" element={<AdmissionsSection />} />
        <Route path="/academy/about" element={<AboutUsSection />} />
        <Route path="/academy/enroll" element={<Applicant />} />
        <Route path="/academy/login" element={<LoginPage />} />
        <Route
          path="/academy/portal"
          element={
            <ProtectedRoute route="/academy/login">
              <PortalDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/academy/admin/login" element={<Login />} />
        <Route
          path="/academy/admin/admission"
          element={
            <ProtectedRoute route="/academy/admin/login">
              <AdmissionsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academy/admin/hr"
          element={
            <ProtectedRoute route="/academy/admin/login">
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academy/admin/registrar"
          element={
            <ProtectedRoute route="/academy/admin/login">
              <RegistrarDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/academy/teacher/login" element={<TeacherLoginPage />} />
        <Route path="/academy/teacher/portal" element={<TeacherDashboard />} />

        <Route path="/publish" element={<PublishArticle />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/journal/ipnj" element={<ProfessionalJournal />} />
        <Route path="/journal/grjmp" element={<MidwiferyJournal />} />
        <Route path="/journal/isjmpnr" element={<MentalHealthJournal />} />
        <Route path="/journal/isj-acnr" element={<ClinicalNursingJournal />} />
        <Route path="/journal/ijmri" element={<InnovationJournal />} />
        <Route path="/journal/ijanr" element={<NursingJournal />} />
        <Route path="/journal/irjmpch" element={<Multidisciplinary />} />
        <Route path="/journal/wjwihpr" element={<WellspringJournal />} />
        <Route path="/journal/irjpch" element={<CommunityJournal />} />
        <Route path="/journal/isjchnr" element={<ISJCHNR />} />
        <Route
          path="/journal/isjpchnr"
          element={<SpecialtyCommunityJournal />}
        />
        <Route path="/journal/isjner" element={<SpecialtyNursingJournal />} />
        <Route
          path="/journal/isj-msnr"
          element={<MedicalSurgicalNursingJournal />}
        />
        <Route path="/journal/mchnr" element={<MaternalChildJournal />} />

        <Route path="/nsu" element={<NSUNProfilePage />} />
        <Route path="/icvs" element={<ICVSPage />} />
        <Route path="/jani" element={<JANI />} />
        <Route path="/commonwealth" element={<CommonwealthPage />} />
        <Route path="/cne" element={<CONE />} />
        <Route path="/nan" element={<NursingAcademy />} />
        <Route path="/ihcns" element={<IntegratedHealth />} />
        <Route path="/inf" element={<InternationalNursingFoundation />} />
        <Route path="/nml" element={<League />} />
        <Route path="/nmc" element={<Maurice />} />
        <Route path="/research" element={<Research />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/health" element={<HealthInstitute />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
