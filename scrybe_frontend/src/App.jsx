import "./App.scss";
import { Routes, Route } from "react-router-dom";
import AgentReport from "./pages/AgentReport";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import DummyPage from "./pages/DummyPage";
import TranscribePage from "./pages/TranscribePage/TranscribePage";
import { FAQs, TermsOfService } from "./pages";
import LandingPage from "./pages/landing-page-a";
import PageB from "./pages/Landing-page-b";
import TermsAndCondition from "./pages/TermsAndCondition/TermsOfService";
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

function App() {
  return (
    <Routes>
      {/* landing page */}
      <Route path="/" element={<LandingPage />} />
      {/* sentiment analysis */}
      <Route path="/agent-report" element={<AgentReport />} />
      <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
      {/* transcriptions */}
      <Route path="/transcriptions" element={<TranscribePage />} />
      {/* try for free */}
      <Route path="/try" element={<TryForFree someText="try for free" />} />
      {/* press */}
      <Route path="/press" element={<DummyPage someText="press" />} />
      {/* settings */}
      <Route path="/settings" element={<DummyPage someText="settings" />} />
      {/* uploaded */}
      <Route
        path="/uploaded"
        element={<DummyPage someText="uploaded recordings" />}
      />
      {/* history */}
      <Route path="/history" element={<History />} />
      {/* help and support */}
      <Route path="/help" element={<DummyPage someText="help and supprt" />} />
      {/* sign in */}

      {/* career page & legal */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      {/* solutions & services */}
      <Route
        path="/services"
        element={<Services someText="solutions and services" />}
      />
      <Route
        path="/solutions"
        element={<Solutions someText="solutions and services" />}
      />
      {/* about us */}
      <Route path="/about-us" element={<About someText="about us" />} />
      {/* events */}
      <Route path="/events" element={<Events someText="events" />} />
      {/* agent report */}
      <Route
        path="/report"
        element={<DummyPage someText="report and performance" />}
      />
      {/* upload pages */}
      <Route path="/upload" element={<DummyPage someText="upload pages" />} />
      {/* dashboard */}
      <Route path="/dashboard" element={<DashboardOverview />} />
      {/* accounts */}
      <Route path="/accounts" element={<Account />} />
      {/* industry */}
      <Route path="/industry" element={<Industry />} />
      {/* industry article */}
      {/* <Route path="/industryarticle" element={<IndustryArticle />} /> */}
      {/* how it works */}
      <Route path="/how-it-works" element={<HowitWorks />} />
      {/* demo pages */}
      <Route path="/demos" element={<DummyPage someText="demo pages" />} />
      {/* reviews & pricing */}
      <Route
        path="/reviews-and-pricing"
        element={<DummyPage someText="reviews and pricing" />}
      />
      {/* leaderboard */}
      <Route
        path="/leaderboard"
        element={<DummyPage someText="leaderboard" />}
      />
      {/* terms and conditions */}
      <Route
        path="/terms"
        element={<TermsAndCondition someText="terms and conditions" />}
      />
      {/* terms of service */}
      <Route
        path="/terms-of-service"
        element={<DummyPage someText="terms of service" />}
      />
      {/* blog */}
      <Route path="/blog" element={<DummyPage someText="blog" />} />
      <Route path="/homeB" element={<PageB />} />
      <Route path="faq" element={<FAQs />} />
      <Route path="faq-terms-of-service" element={<TermsOfService />} />
      {/* HelpAndSupport */}
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

      {/* Sign In, Sign Up and Reset Password  Flow */}
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
    </Routes>
  );
}

export default App;
