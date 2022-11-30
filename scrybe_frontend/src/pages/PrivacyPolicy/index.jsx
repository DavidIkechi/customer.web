import Header from "../../components/navBar_free/index";
import Footer from "../../components/footer/index";
import Analytics from "./Components/Analytics.jsx";
import Changes from "./Components/Changes.jsx";
import CiCdTools from "./Components/CiCdTools.jsx";
import ContactUs from "./Components/ContactUs.jsx";
import DataCollected from "./Components/DataCollected.jsx";
import DataProtectionRights from "./Components/DataProtectionRights.jsx";
import Definitions from "./Components/Definitions.jsx";
import DisclosureOfData from "./Components/DisclosureOfData.jsx";
import InformationCollectionUse from "./Components/InformationCollectionUse.jsx";
import Introduction from "./Components/Introduction.jsx";
import LawfulBasis from "./Components/LawfulBasis.jsx";
import LinksToOtherSites from "./Components/LinksToOtherSites.jsx";
import RetentionOfData from "./Components/RetentionOfData.jsx";
import SecurityOfData from "./Components/SecurityOfData.jsx";
import ServiceProviders from "./Components/ServiceProviders.jsx";
import TransferOfData from "./Components/TransferOfData.jsx";
import UseOfData from "./Components/UseOfData.jsx";
import YourRights from "./Components/YourRights.jsx";
import Payments from "./Components/Payments.jsx";

import "./Style/privacyPolicy.scss";

function PrivacyPolicy() {
  return (
    <section className="privacy">
      <Header />
      <div className="container">
        <div className="heading">
          <h1>PRIVACY POLICY</h1>
          <p>Effective date: 22-11-16</p>
        </div>
        <div>
          <Introduction />
          <Definitions />
          <InformationCollectionUse />
          <DataCollected />
          <UseOfData />
          <RetentionOfData />
          <TransferOfData />
          <DisclosureOfData />
          <SecurityOfData />
          <YourRights />
          <LawfulBasis />
          <DataProtectionRights />
          <ServiceProviders />
          <Analytics />
          <CiCdTools />
          <Payments />
          <LinksToOtherSites />
          <Changes />
          <ContactUs />
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default PrivacyPolicy;
