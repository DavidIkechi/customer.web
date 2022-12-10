import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { RequireToken } from "./Auth";
import About from "./pages/AboutUs";
import AgentReport from "./pages/AgentReport";
import DashboardOverview from "./pages/DashboardOverview";
import DummyPage from "./pages/DummyPage";
import Events from "./pages/Events/Events";
import HelpSupport from "./pages/HelpAndSupport/HelpSupport";
import History from "./pages/History";
import HomePageB from "./pages/HomePageB";
import PressArticle from "./pages/PressArticle";
import Press from "./pages/PressPage";
import Pricing from "./pages/Pricing";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import Services from "./pages/Services/Services";
import Solutions from "./pages/Solutions/Solutions";
import TermsAndCondition from "./pages/TermsAndCondition";
import TranscribePage from "./pages/TranscribePage";
import TryForFree from "./pages/TryForFree";
import WithAuth from "./HOCs";
import Account from "./pages/Account";
import BlogPostPage from "./pages/BlogPostPage";
import Blogs from "./pages/BlogsPage";
import Careers from "./pages/Careers";
import Error from "./pages/Error/Error";
import FAQs from "./pages/FaqsPage";
// import ForgetPasswordNew from "./pages/ForgotPasswordNew/Index";
// import CheckMail from "./pages/CheckMail";
import CheckMail from "./pages/CheckMail/index";
import General from "./pages/HelpAndSupport/components/General";
import PromotedArticles from "./pages/HelpAndSupport/components/PromotedArticles";
import HomePageRedesign from "./pages/HomePageRedesign";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
import LandingPageSalesTeam from "./pages/NewLandingPageSalesTeam/index";
import PartnersPage from "./pages/PartnersPage";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful/PasswordResetSuccessful";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Reviews from "./pages/Reviews/Reviews";
import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import SettingsIndex from "./pages/Settings/SettingsIndex";
import AccountSettings from "./pages/Settings/SettingsPageSubPages/AccountSettings/AccountSettings";
import NotificationSettings from "./pages/Settings/SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "./pages/Settings/SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";
import Signin from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/SignUp";
import SignUpVerify from "./pages/SignUpVerify/SignUpVerify";
// import Successful from "./pages/Successful/Successful";
import Support from "./pages/Support/support";
import TermsOfService from "./pages/TermsOfService";
// import TryProcessing from "./pages/TryForFree/tryProcessing";
import TryResults from "./pages/TryForFree/tryResults";
import UploadedRecordings from "./pages/UploadRecordings";
import { UploadModal } from "./pages/UploadRecordingsModal";
import Logout from "./pages/Logout";
import EmailVerify from "./pages/VerificationEmail/EmailVerify";
// import CheckMail from "./pages/CheckMail";
import NewSignin from "./pages/NewSignin/NewSignin";
// import CreateAccount from "./pages/NewSignup/CreateAccount";
import CreateAccount from "./pages/NewSignup/CreateAccount";
import StartUp from "./pages/Checkout/Startup";
import Growing from "./pages/Checkout/Growing";
import Enterprise from "./pages/Checkout/Enterprise";
import FinalSignIn from "./pages/FinalLoginPage/Login";
// import CheckMail from "./pages/CheckMail";
import ComingSoon from "./pages/ComingSoonPage/index";

// import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ForgetPasswordNew from "./pages/ForgotPasswordNew/Index";
import NewSetNewPassword from "./pages/NewSetNewPassword";
import NewPasswordResetSuccessful from "./pages/NewPasswordResetSuccessful";
import CompleteSignup from "./pages/NewSignup/CompleteSignup/CompleteSignup";

import * as atatus from "atatus-js";

atatus.config("e7b42895d6f546a2b1f86414988a8afa").install();

function App() {
  return (
    <>
      <Routes>
        {/* access without sign in */}
        <Route path="/" element={<HomePageRedesign />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/complete-signup" element={<CompleteSignup />} />
        <Route path="/login" element={<NewSignin />} />
        <Route path="/check-mail" element={<CheckMail />} />
        <Route path="/try" element={<TryForFree />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/create-account" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/reset-successful" element={<Successful />} /> */}
        <Route path="/verify-signup" element={<SignUpVerify />} />
        <Route path="/support-team" element={<Support />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/coming-soon" element={<ComingSoon />} />

        {/* <Route
          path="/set-new-password?token=:token"
          element={<SetNewPassword />}
        /> */}
        <Route path="/emailverification/:token" element={<EmailVerify />} />
        {/* <Route path="/try-processing" element={<TryProcessing />} /> */}
        <Route path="/try-results" element={<TryResults />} />
        {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}

        <Route path="/sales-team" element={<LandingPageSalesTeam />} />
        {/* <Route
          path="/pw-reset-successful"
          element={<PasswordResetSuccessful />}
        /> */}
        <Route path="*" element={<Error />} />
        <Route path="/demos" element={<DummyPage someText="demo pages" />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="press" element={<Press />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="press-article" element={<PressArticle />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/homeB" element={<HomePageB />} />
        <Route path="/uploaded-recordings" element={<UploadedRecordings />} />
        <Route path="/agent-report/:agentId" element={<AgentReport />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* <Route path="/try-processing" element={<TryProcessing />} /> */}
        <Route path="/try-results/:transcribeId" element={<TryResults />} />
        <Route
          path="settings/personal-information"
          element={<PersonalInformation />}
        />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="press" element={<Press />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="press-article" element={<PressArticle />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/help-support-general" element={<General />} />
        <Route path="/promoted-articles" element={<PromotedArticles />}></Route>

        {/* cant access without signin */}

        <Route element={<RequireToken />}>
          <Route
            path="/account"
            element={
              <WithAuth>
                <Account />
              </WithAuth>
            }
          />
          <Route path="/account" element={<Account />} />
          <Route path="/uploaded-recordings" element={<UploadedRecordings />} />
          <Route path="/agent-report/:Agent_id" element={<AgentReport />} />
          <Route path="/upload-new-file" element={<UploadModal />} />
          <Route
            path="/sentiment-analysis/:AudioId"
            element={<SentimentAnalysis />}
          />
          <Route path="/transcriptions/:userId" element={<TranscribePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/homeB" element={<HomePageB />} />
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
        <Route path="checkout-startup" element={<StartUp />} />
        <Route path="checkout-growing" element={<Growing />} />
        <Route path="checkout-enterprise" element={<Enterprise />} />

        {/* path for forgot/reset password */}
        <Route path="/forget-password" element={<ForgetPasswordNew />} />
        <Route path="/set-new-password" element={<NewSetNewPassword />} />
        <Route
          path="/pw-reset-successful"
          element={<NewPasswordResetSuccessful />}
        />
      </Routes>
    </>
  );
}

export default App;
