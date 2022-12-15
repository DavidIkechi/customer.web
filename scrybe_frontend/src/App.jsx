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
import Account from "./pages/Account";
import Error from "./pages/Error/Error";
import FAQs from "./pages/FaqsPage";
import CheckMail from "./pages/CheckMail/index";
import HomePageRedesign from "./pages/HomePageRedesign";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
import LandingPageSalesTeam from "./pages/NewLandingPageSalesTeam/index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Reviews from "./pages/Reviews/Reviews";
import AccountSettings from "./pages/Settings/SettingsPageSubPages/AccountSettings/AccountSettings";
import NotificationSettings from "./pages/Settings/SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "./pages/Settings/SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";
import SignUpVerify from "./pages/SignUpVerify/SignUpVerify";
import Support from "./pages/Support/support";
import TryResults from "./pages/TryForFree/tryResults";
import UploadedRecordings from "./pages/UploadRecordings";
import Logout from "./pages/Logout";
import EmailVerify from "./pages/VerificationEmail/EmailVerify";
import CreateAccount from "./pages/NewSignup/CreateAccount";
import StartUp from "./pages/Checkout/Startup";
import Growing from "./pages/Checkout/Growing";
import Enterprise from "./pages/Checkout/Enterprise";
import FinalSignIn from "./pages/FinalLoginPage/Login";
import ForgetPasswordNew from "./pages/ForgotPasswordNew/Index";
import NewSetNewPassword from "./pages/NewSetNewPassword";
import NewPasswordResetSuccessful from "./pages/NewPasswordResetSuccessful";
import CompleteSignup from "./pages/NewSignup/CompleteSignup/CompleteSignup";
import SettingsRedesigned from "./pages/SettingsRedesigned";

// useless

// import ComingSoon from "./pages/ComingSoonPage/index";
// import CheckMail from "./pages/CheckMail";
// import PartnersPage from "./pages/PartnersPage";
// import BlogPostPage from "./pages/BlogPostPage";
// import Services from "./pages/Services/Services";
// import HomePageB from "./pages/HomePageB";
// import DummyPage from "./pages/DummyPage";
// import Events from "./pages/Events/Events";
// import PressArticle from "./pages/PressArticle";
// import Press from "./pages/PressPage";
// import Solutions from "./pages/Solutions/Solutions";
// import Blogs from "./pages/BlogsPage";
// import Careers from "./pages/Careers";
// import General from "./pages/HelpAndSupport/components/General";
// import PromotedArticles from "./pages/HelpAndSupport/components/PromotedArticles";
// import Signin from "./pages/SignIn/SignIn";
// import Signup from "./pages/SignUp/SignUp";
// import TermsOfService from "./pages/TermsOfService";
// import NewSignin from "./pages/NewSignin/NewSignin";
// import CreateAccount from "./pages/NewSignup/CreateAccount";

// useless

import * as atatus from "atatus-spa";
atatus.config("006cee2d85d74c12953a30f3e9b78569").install();

function App() {
  return (
    <>
      <Routes>
        {/* access without sign in */}
        <Route path="/" element={<HomePageRedesign />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/complete-signup" element={<CompleteSignup />} />
        <Route path="/login" element={<FinalSignIn />} />
        <Route path="/check-mail" element={<CheckMail />} />
        <Route path="/try" element={<TryForFree />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/verify-signup" element={<SignUpVerify />} />
        <Route path="/support-team" element={<Support />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/emailverification" element={<EmailVerify />} />
        <Route path="/try-results" element={<TryResults />} />

        <Route path="/sales-team" element={<LandingPageSalesTeam />} />
        <Route path="*" element={<Error />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/try-results/:transcribeId" element={<TryResults />} />
        <Route
          path="settings/personal-information"
          element={<PersonalInformation />}
        />
        <Route path="/reviews" element={<Reviews />} />

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
          <Route path="/settings" element={<SettingsRedesigned />} />
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

// useless

{
  /* <Route path="/careers" element={<Careers />} /> */
}
{
  /* <Route path="/services" element={<Services />} /> */
}
{
  /* <Route path="/solutions" element={<Solutions />} /> */
}
{
  /* <Route path="/terms-of-service" element={<TermsOfService />} /> */
}
{
  /* <Route path="/create-account" element={<CreateAccount />} /> */
}
{
  /* <Route path="/signin" element={<Signin />} /> */
}
{
  /* <Route path="/coming-soon" element={<ComingSoon />} /> */
}
{
  /* <Route path="/demos" element={<DummyPage someText="demo pages" />} /> */
}
{
  /* <Route path="/blog" element={<Blogs />} />
<Route path="/blog/:id" element={<BlogPostPage />} /> */
}
{
  /* <Route path="press" element={<Press />} /> */
}
{
  /* <Route path="/partners" element={<PartnersPage />} /> */
}
{
  /* <Route path="press-article" element={<PressArticle />} /> */
}
{
  /* <Route path="/events" element={<Events />} /> */
}
{
  /* <Route path="/blog" element={<Blogs />} />
<Route path="/blog/:id" element={<BlogPostPage />} /> */
}
{
  /* <Route path="press" element={<Press />} /> */
}
{
  /* <Route path="/partners" element={<PartnersPage />} /> */
}
{
  /* <Route path="press-article" element={<PressArticle />} /> */
}
{
  /* <Route path="pricing" element={<Pricing />} /> */
}
{
  /* <Route path="/help-support-general" element={<General />} /> */
}
{
  /* <Route path="/promoted-articles" element={<PromotedArticles />}></Route> */
}
{
  /* <Route path="/homeB" element={<HomePageB />} /> */
}
{
  /* path for forgot/reset password */
}

// useless
