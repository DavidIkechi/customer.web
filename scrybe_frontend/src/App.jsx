import "./App.scss";
import { Routes, Route } from "react-router-dom";
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
// import General from "./components/HelpAndSupport/HelpAndSupportGeneral/General";
// import General1 from "./components/HelpAndSupport/general1/General1";
// import General2 from "./components/HelpAndSupport/general2/General2";
// import PromotedArticles from "./components/HelpAndSupport/promoted-articles/PromotedArticles";
// import PromotedArticle1 from "./components/HelpAndSupport/PromotedArticle1/PromotedArticle1";
import About from "./pages/AboutUs/About";
import TryForFree from "./pages/TryForFree";
import Industry from "./pages/indsutry/industry";
import HowitWorks from "./pages/HowItWorks/HowItWorks";
import UploadedRecordings from "./pages/UploadRecordings";
import Account from "./pages/Account";
import Signin from "./pages/SignIn/SignIn";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// import IndustryArticle from "./components/Industry/industryArticle";
import Signup from "./pages/SignUp/SignUp";
import Successful from "./pages/Successful/Successful";
import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful/PasswordResetSuccessful";
import FAQs from "./pages/FaqsPage";
import TermsOfService from "./pages/TermsOfService";
import Blogs from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import LeaderboardPage from "./pages/LeaderBoard/Leaderboard";
import Reviews from "./pages/Reviews/Reviews";
import TryProcessing from "./pages/TryForFree/tryProcessing";
import TryResults from "./pages/TryForFree/tryResults";

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
      <Route
        path="/services"
        element={<Services someText="solutions and services" />}
      />
      <Route
        path="/solutions"
        element={<Solutions someText="solutions and services" />}
      />
      <Route path="/about-us" element={<About someText="about us" />} />
      <Route path="/events" element={<Events someText="events" />} />
      <Route path="/dashboard" element={<DashboardOverview />} />
      <Route path="/accounts" element={<Account />} />
      <Route path="/industry" element={<Industry />} />
      <Route path="/how-it-works" element={<HowitWorks />} />
      {/* leaderboard */}
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route
        path="/terms"
        element={<TermsAndCondition someText="terms and conditions" />}
      />
      <Route
        path="/terms-of-service"
        element={<TermsOfService someText="terms of service" />}
      />
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
      <Route path="/press" element={<DummyPage someText="press" />} />
      <Route path="/settings" element={<DummyPage someText="settings" />} />
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
      <Route path="/blog" element={<Blogs someText="blog" />} />
      <Route path="/blog/:id" element={<BlogPostPage someText="blog" />} />
      <Route path="/reviews" element={<Reviews />} />

      {/* Try Routes */}
      <Route path="/try-processing" element={<TryProcessing />} />
      <Route path="/try-results" element={<TryResults />} />
    </Routes>
  );
}

export default App;
