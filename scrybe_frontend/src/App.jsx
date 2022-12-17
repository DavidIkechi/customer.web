import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { RequireToken } from "./Auth";
import About from "./pages/AboutUs";
import AgentReport from "./pages/AgentReport";
import DashboardOverview from "./pages/DashboardOverview";
import HelpSupport from "./pages/HelpAndSupport/HelpSupport";
import History from "./pages/History";
import Pricing from "./pages/Pricing";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import TermsAndCondition from "./pages/TermsAndCondition";
import TranscribePage from "./pages/TranscribePage";
import TryForFree from "./pages/TryForFree";
// import WithAuth from "./HOCs";
import Account from "./pages/Account";
import Error from "./pages/Error/Error";
import FAQs from "./pages/FaqsPage";
// import ForgetPasswordNew from "./pages/ForgotPasswordNew/Index";
// import CheckMail from "./pages/CheckMail";
import CheckMail from "./pages/CheckMail/index";
import HomePageRedesign from "./pages/HomePageRedesign";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
import LandingPageSalesTeam from "./pages/NewLandingPageSalesTeam/index";
// import PartnersPage from "./pages/PartnersPage";
// import PasswordResetSuccessful from "./pages/PasswordResetSuccessful/PasswordResetSuccessful";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Reviews from "./pages/Reviews/Reviews";
// import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import SettingsIndex from "./pages/Settings/SettingsIndex";
import AccountSettings from "./pages/Settings/SettingsPageSubPages/AccountSettings/AccountSettings";
import NotificationSettings from "./pages/Settings/SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "./pages/Settings/SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";
import SignUpVerify from "./pages/SignUpVerify/SignUpVerify";
// import Successful from "./pages/Successful/Successful";
import Support from "./pages/Support/support";
// import TermsOfService from "./pages/TermsOfService";
// import TryProcessing from "./pages/TryForFree/tryProcessing";
import TryResults from "./pages/TryForFree/tryResults";
import UploadedRecordings from "./pages/UploadRecordings";
import Logout from "./pages/Logout";
import EmailVerify from "./pages/VerificationEmail/EmailVerify";
import CreateAccount from "./pages/NewSignup/CreateAccount";
import StartUp from "./pages/Checkout/Startup";
import Growing from "./pages/Checkout/Growing";
import Enterprise from "./pages/Checkout/Enterprise";
import FinalSignIn from "./pages/FinalLoginPage/Login";
// import CheckMail from "./pages/CheckMail";
// import ComingSoon from "./pages/ComingSoonPage/index";
// import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ForgetPasswordNew from "./pages/ForgotPasswordNew/Index";
import NewSetNewPassword from "./pages/NewSetNewPassword";
import NewPasswordResetSuccessful from "./pages/NewPasswordResetSuccessful";
import CompleteSignup from "./pages/NewSignup/CompleteSignup/CompleteSignup";

import * as atatus from "atatus-spa";
import PublicLayout from "./PublicLayout";
atatus.config("006cee2d85d74c12953a30f3e9b78569").install();

function App() {
  return (
    <>
      <Routes>
        {/* access without sign in */}
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/complete-signup" element={<CompleteSignup />} />
        <Route path="/login" element={<FinalSignIn />} />
        <Route path="/check-mail" element={<CheckMail />} />
        <Route path="/verify-signup" element={<SignUpVerify />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/emailverification" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgetPasswordNew />} />
        <Route path="/set-new-password" element={<NewSetNewPassword />} />
        <Route
          path="/pw-reset-successful"
          element={<NewPasswordResetSuccessful />}
        />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePageRedesign />} />
          <Route path="/try" element={<TryForFree />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<TermsAndCondition />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/support-team" element={<Support />} />
          <Route path="/try-results" element={<TryResults />} />
          <Route path="/sales-team" element={<LandingPageSalesTeam />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/try-results/:transcribeId" element={<TryResults />} />

          <Route path="/checkout-startup" element={<StartUp />} />
          <Route path="/checkout-growing" element={<Growing />} />
          <Route path="/checkout-enterprise" element={<Enterprise />} />

          <Route path="/reviews" element={<Reviews />} />
        </Route>
        {/* cant access without signin */}

        <Route element={<RequireToken />}>
          <Route path="/account" element={<Account />} />
          <Route path="/uploaded-recordings" element={<UploadedRecordings />} />
          <Route path="/agent-report/:Agent_id" element={<AgentReport />} />
          <Route
            path="/sentiment-analysis/:AudioId"
            element={<SentimentAnalysis />}
          />
          <Route path="/transcriptions/:userId" element={<TranscribePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/agent-report/:agentId" element={<AgentReport />} />
          <Route path="/settings" element={<SettingsIndex />} />
          <Route
            path="settings/account-security"
            element={<AccountSettings />}
          />
          <Route
            path="settings/notifications"
            element={<NotificationSettings />}
          />
          <Route
            path="settings/personal-information"
            element={<PersonalInformation />}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
