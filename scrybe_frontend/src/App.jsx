import { Route, Routes } from "react-router-dom";
import "./App.scss";
import About from "./pages/AboutUs";
import AgentReport from "./pages/AgentReport";
import DashboardOverview from "./pages/DashboardOverview";
import DummyPage from "./pages/DummyPage";
import Events from "./pages/Events/Events";
import HelpSupport from "./pages/HelpAndSupport/HelpSupport";
import History from "./pages/History/History";
import HomePage from "./pages/HomePageA";
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
// import Industry from "./pages/Industry";
// import IndustryArticles from "./pages/Industry/IndustryArticles/IndustryArticle1";
// import HowitWorks from "./pages/HowItWorks";
import React from "react";
import WithAuth from "./HOC";
import Account from "./pages/Account";
import BlogPostPage from "./pages/BlogPostPage";
import Blogs from "./pages/BlogsPage";
import Careers from "./pages/Careers";
import FAQs from "./pages/FaqsPage";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
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
import Successful from "./pages/Successful/Successful";
import TermsOfService from "./pages/TermsOfService";
import TryProcessing from "./pages/TryForFree/tryProcessing";
import TryResults from "./pages/TryForFree/tryResults";
import UploadedRecordings from "./pages/UploadRecordings";

const AuthApi = React.createContext();
const TokenApi = React.createContext();

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/account"
          element={
            <WithAuth>
              {" "}
              <Account />{" "}
            </WithAuth>
          }
        />

        {/* <Route path="/industry" exact element={<Industry />} /> */}
        {/* <Route path="/industry-article" element={<IndustryArticles />} />
        <Route path="/how-it-works" element={<HowitWorks />} /> */}
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
        <Route path="/verify-signup" element={<SignUpVerify />} />
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
        <Route
          path="/help"
          element={<DummyPage someText="help and supprt" />}
        />
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
        <Route
          path="settings/notifications"
          element={<NotificationSettings />}
        />
        <Route
          path="settings/personal-information"
          element={<PersonalInformation />}
        />
        {/* Press  */}
        <Route path="press" element={<Press />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="press-article" element={<PressArticle />} />
        <Route path="pricing" element={<Pricing />} />
      </Routes>
    </>
  );
}

export default App;
