import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AgentReport from "./pages/AgentReport";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import DummyPage from "./pages/DummyPage";
import TranscribePage from "./pages/TranscribePage";
import HomePage from "./pages/HomePageA";
import HomePageB from "./pages/HomePageB";
import TermsAndCondition from "./pages/TermsAndCondition";
import History from "./pages/History/History";
import Services from "./pages/Services/Services";
import Solutions from "./pages/Solutions/Solutions";
import DashboardOverview from "./pages/DashboardOverview";
import Events from "./pages/Events/Events";
import HelpSupport from "./pages/HelpAndSupport/HelpSupport";
import About from "./pages/AboutUs/About";
import TryForFree from "./pages/TryForFree";
import Press from "./pages/PressPage";
import PressArticle from "./pages/PressArticle";
import Industry from "./pages/Industry";
import IndustryArticles from "./pages/Industry/IndustryArticles/IndustryArticle1";
import HowitWorks from "./pages/HowItWorks";
import UploadedRecordings from "./pages/UploadRecordings";
import Account from "./pages/Account";
import Signin from "./pages/SignIn/SignIn";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Signup from "./pages/SignUp/SignUp";
import Successful from "./pages/Successful/Successful";
import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful/PasswordResetSuccessful";
import FAQs from "./pages/FaqsPage";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
import Reviews from "./pages/Reviews/Reviews";
import TryProcessing from "./pages/TryForFree/tryProcessing";
import TryResults from "./pages/TryForFree/tryResults";
import TermsOfService from "./pages/TermsOfService";
import Blogs from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import SettingsIndex from "./pages/Settings/SettingsIndex";
import AccountSettings from "./pages/Settings/SettingsPageSubPages/AccountSettings/AccountSettings";
import NotificationSettings from "./pages/Settings/SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "./pages/Settings/SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/agent-report" element={<AgentReport />} />
      <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
      <Route path="/transcriptions/:userId" element={<TranscribePage />} />
      <Route path="/try" element={<TryForFree />} />
      <Route path="/history" element={<History />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/services" element={<Services />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/dashboard" element={<DashboardOverview />} />
      <Route path="/accounts" element={<Account />} />
      <Route path="/industry" exact element={<Industry />} />
      <Route path="/industry-article" element={<IndustryArticles />} />
      <Route path="/how-it-works" element={<HowitWorks />} />
      {/* leaderboard */}
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/terms" element={<TermsAndCondition />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/homeB" element={<HomePageB />} />
      <Route path="/faq" element={<FAQs />} />
      <Route path="/help-support" element={<HelpSupport />} />
      {/* <Route path="/help-support-general" element={<General />}>
        <Route index element={<General1 />} />
        <Route path="articles" element={<General2 />} />
      </Route> */}
      {/* <Route
        path="/help-support-general/promoted-articles"
        element={<PromotedArticles />}
      >
        <Route index element={<PromotedArticle1 />} />
        <Route path="*" element={<PromotedArticle1 />} />
      </Route> */}
      {/* <Route
        path="/help-support/promoted-articles"
        element={<PromotedArticles />}
      >
        <Route index element={<PromotedArticle1 />} />
        <Route path="*" element={<PromotedArticle1 />} />
      </Route> */}

      <Route path="/create-account" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/reset-successful" element={<Successful />} />
      <Route path="/set-new-password" element={<SetNewPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route
        path="/pw-reset-successful"
        element={<PasswordResetSuccessful />}
      />
      <Route path="/uploaded-recordings" element={<UploadedRecordings />} />
      <Route path="/agent-report" element={<AgentReport />} />

      {/* ROutes without working paths */}

      <Route
        path="/uploaded"
        element={<DummyPage someText="uploaded recordings" />}
      />
      <Route
        path="/report"
        element={<DummyPage someText="report and performance" />}
      />
      <Route path="/upload" element={<DummyPage someText="upload pages" />} />
      <Route path="/help" element={<DummyPage someText="help and supprt" />} />
      <Route path="/demos" element={<DummyPage someText="demo pages" />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/reviews" element={<Reviews />} />

      {/* Try Routes */}
      <Route path="/try-processing" element={<TryProcessing />} />
      <Route path="/try-results" element={<TryResults />} />

      {/* Settings Pages */}
      <Route path="/settings" element={<SettingsIndex />} />
      <Route path="settings/account-security" element={<AccountSettings />} />
      <Route path="settings/notifications" element={<NotificationSettings />} />

      <Route
        path="settings/personal-information"
        element={<PersonalInformation />}
      />

      {/* Press  */}
      <Route path="press" element={<Press />} />
      <Route path="press-article" element={<PressArticle />} />
    </Routes>
  );
}

export default App;
