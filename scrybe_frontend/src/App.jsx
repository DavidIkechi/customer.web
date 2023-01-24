import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Authenticated, RequireToken } from "./Auth";
import About from "./pages/AboutUs";
import Account from "./pages/Account";
import AgentReport from "./pages/AgentReport";
import CheckMail from "./pages/CheckMail/index";
import Enterprise from "./pages/Checkout/Enterprise";
import DashboardOverview from "./pages/DashboardOverview";
import Error from "./pages/Error/Error";
import FAQs from "./pages/FaqsPage";
import FinalSignIn from "./pages/FinalLoginPage/Login";
import ForgetPasswordNew from "./pages/ForgotPasswordNew/Index";
import HelpSupport from "./pages/HelpAndSupport/HelpSupport";
import HomePageRedesign from "./pages/HomePageRedesign";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
import Logout from "./pages/Logout";
import LandingPageSalesTeam from "./pages/NewLandingPageSalesTeam/index";
import NewPasswordResetSuccessful from "./pages/NewPasswordResetSuccessful";
import NewSetNewPassword from "./pages/NewSetNewPassword";
import CompleteSignup from "./pages/NewSignup/CompleteSignup";
import CreateAccount from "./pages/NewSignup/CreateAccount";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Reviews from "./pages/Reviews/Reviews";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import SettingsIndex from "./pages/Settings/SettingsIndex";
import AccountSettings from "./pages/Settings/SettingsPageSubPages/AccountSettings/AccountSettings";
import NotificationSettings from "./pages/Settings/SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "./pages/Settings/SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";
import SignUpVerify from "./pages/SignUpVerify/SignUpVerify";
import Support from "./pages/Support/support";
import TermsAndCondition from "./pages/TermsAndCondition";
import TranscribePage from "./pages/TranscribePage";
import TryForFree from "./pages/TryForFree";
import TryResults from "./pages/TryForFree/tryResults";
import UploadedRecordings from "./pages/UploadedRecordings";
import EmailVerify from "./pages/VerificationEmail/EmailVerify";

import * as atatus from "atatus-spa";
import { useSelector } from "react-redux";
import SnackBar from "./components/SnackBar";
import CheckoutPage from "./pages/Pricing/CheckoutPage";
import PaymentFailed from "./pages/Pricing/PaymentFailed";
import PublicLayout from "./PublicLayout";
atatus.config("006cee2d85d74c12953a30f3e9b78569").install();

function App() {
  const { response } = useSelector((state) => state.util);

  return (
    <>
      {response.message !== "" && <SnackBar response={response} />}
      <Routes>
        {/* access without sign in */}
        <Route element={<Authenticated />}>
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/complete-signup" element={<CompleteSignup />} />
          <Route path="/login" element={<FinalSignIn />} />
        </Route>
        <Route path="/check-mail" element={<CheckMail />} />
        <Route path="/verify-signup" element={<SignUpVerify />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/verification" element={<EmailVerify />} />
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

          <Route path="/reviews" element={<Reviews />} />

          <Route path="/checkout-enterprise" element={<Enterprise />} />
        </Route>
        {/* cant access without signin */}

        <Route element={<RequireToken />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/stripe-order/" element={<CheckoutPage />} />
          <Route path="/paymentFailed" element={<PaymentFailed />} />
          <Route path="/account" element={<Account />} />
          <Route path="/uploaded-recordings" element={<UploadedRecordings />} />
          <Route path="/agent-report/:Agent_id" element={<AgentReport />} />
          <Route
            path="/sentiment-analysis/:AudioId"
            element={<SentimentAnalysis />}
          />
          <Route path="/transcriptions/:userId" element={<TranscribePage />} />
          {/* <Route path="/history" element={<History />} /> */}
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
