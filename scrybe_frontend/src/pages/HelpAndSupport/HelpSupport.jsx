import { Helmet } from "react-helmet-async";
import Articles from "./components/Articles";
import Cards from "./components/Cards/Cards";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import styles from "./HelpSupport.module.scss";

function HelpSupport() {
  return (
    <>
      <Helmet>
        <title>Help & Support</title>
        <meta
          name="description"
          content="Help & Support, Our help and support page is your one-stop destination for all your customer service needs. Whether you need technical support, troubleshooting assistance, or just some guidance on how to use our product or service, we've got you covered. Our page features a comprehensive FAQ section, as well as a variety of how-to guides and user manuals to help you get the most out of our offering.
If you can't find the answer to your question in these resources, our dedicated support team is available 24/7 to assist you with any issues you may encounter. We also offer a variety of self-service options, such as a knowledge base and case management system, to help you resolve problems quickly and efficiently. We are committed to providing the highest level of customer satisfaction, and welcome any feedback or suggestions you may have to help us improve our support services"
        />
        <meta
          name="keywords"
          content="Help & Support, help and support, customer service, technical support, troubleshooting, FAQs, how-to guides, self-service, knowledge base, user manual, help center, online support, live support, 24/7 support, customer assistance, technical assistance, customer support, support services, customer help, support staff, customer care, support team, problem resolution, issue tracking, case management, contact support, customer feedback, community support, customer satisfaction, technical documentation"
        />
      </Helmet>
      <div className={styles.body}>
        <Header />
        <Input />
        <Cards />
        <div className={styles.article}>
          <Articles />
        </div>
        <Contact />
      </div>
    </>
  );
}

export default HelpSupport;
