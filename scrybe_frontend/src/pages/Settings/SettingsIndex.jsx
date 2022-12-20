// import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage/Settings";
import AccountSetting from "./SettingsPageSubPages/AccountSettings/AccountSettings";
import Notification from "./SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "./SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";

function SettingsIndex() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/personal-information" element={<PersonalInformation />} />
        <Route path="/account-security" element={<AccountSetting />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </div>
  );
}

export default SettingsIndex;
