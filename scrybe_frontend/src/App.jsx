import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Dummy from "./components/Dummy";
import AgentReport from "./pages/agent-report";
import DummyPage from "./pages/DummyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dummy />} />
      {/* landing page */}
      {/* <Route path="/" element={<DummyPage />} /> */}
      {/* agent report */}
      <Route path="/agent-report" element={<AgentReport />} />
      {/* sentiment analysis */}
      <Route
        path="/sentiment-analysis"
        element={<DummyPage someText="sentiment-analysis" />}
      />
      {/* transcriptions */}
      <Route
        path="/transicriptions"
        element={<DummyPage someText="transcriptions" />}
      />
      {/* try for free */}
      <Route path="/try" element={<DummyPage someText="try for free" />} />
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
      <Route path="/history" element={<DummyPage someText="history" />} />
      {/* help and support */}
      <Route path="/help" element={<DummyPage someText="help and supprt" />} />
      {/* sign in */}
      <Route
        path="/auth"
        element={<DummyPage someText="sign-in, sign up, reset password" />}
      />
      <Route
        path="/transicriptions"
        element={<DummyPage someText="transcriptions" />}
      />
      <Route
        path="/transicriptions"
        element={<DummyPage someText="transcriptions" />}
      />
      {/* career page & legal */}
      <Route
        path="/careers-and-legal"
        element={<DummyPage someText="career page and legal" />}
      />
      {/* solutions & services */}
      <Route
        path="/services"
        element={<DummyPage someText="solutions and services" />}
      />
      {/* about us */}
      <Route path="/about-us" element={<DummyPage someText="about us" />} />
      {/* events */}
      <Route path="/events" element={<DummyPage someText="events" />} />
      {/* agent report */}
      <Route
        path="/report"
        element={<DummyPage someText="report and performance" />}
      />
      {/* upload pages */}
      <Route path="/upload" element={<DummyPage someText="upload pages" />} />
      {/* dashboard */}
      <Route
        path="/dashboard"
        element={<DummyPage someText="dashboard overview" />}
      />
      {/* accounts */}
      <Route path="/accounts" element={<DummyPage someText="accounts" />} />
      {/* industry */}
      <Route path="/industry" element={<DummyPage someText="industry" />} />
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
        element={<DummyPage someText="terms and conditions" />}
      />
      {/* terms of service */}
      <Route
        path="/terms-of-service"
        element={<DummyPage someText="terms of service" />}
      />
      {/* blog */}
      <Route path="/blog" element={<DummyPage someText="blog" />} />
    </Routes>
  );
}

export default App;
