// import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/Settings";
import PersonalInformation from "./SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";
import AccountSetting from "./SettingsPageSubPages/AccountSettings/AccountSettings";
import Notification from "./SettingsPageSubPages/Notifications/NotificationSettings";

function Index() {
  return (
    <div className="Index">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="settings/personal-information"
          element={<PersonalInformation />}
        />
        <Route path="settings/account-security" element={<AccountSetting />} />
        <Route path="settings/notification" element={<Notification />} />
      </Routes>
    </div>
  );
}

export default Index;
