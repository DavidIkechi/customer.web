import Header from "../Header/Header";
import HelpSupportNav from "../HelpSupportNav/HelpSupportNav";
import Contact from "../Contact/Contact";
import styles from "./PromotedArticles.module.scss";
import PromotedArticle1 from "../PromotedArticle1/PromotedArticle1";
import NavBarFree from "../../../../components/NavbarFree";
import Footer from "../../../../components/Footer";

function PromotedArticles() {
  return (
    <>
      <NavBarFree />
      <div className={styles.body}>
        <Header />
        <div className={styles.general}>
          <HelpSupportNav text="Promoted Articles" />
          <PromotedArticle1 />
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PromotedArticles;
