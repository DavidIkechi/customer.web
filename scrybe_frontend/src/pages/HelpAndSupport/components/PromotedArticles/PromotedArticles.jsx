import Header from "../Header/Header";
import HelpSupportNav from "../HelpSupportNav/HelpSupportNav";
import Contact from "../Contact/Contact";
import styles from "./PromotedArticles.module.scss";
import PromotedArticle1 from "../PromotedArticle1/PromotedArticle1";
import NavBar from "../../../../components/navBar";
import Footer from "../../../../components/footer";

function PromotedArticles() {
  return (
    <>
      <NavBar />
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
