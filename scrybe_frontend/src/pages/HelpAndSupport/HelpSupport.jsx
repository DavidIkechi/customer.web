import Footer from "../../components/Footer";
import NavBarFree from "../../components/NavbarFree";
import Articles from "./components/Articles";
import Cards from "./components/Cards/Cards";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import styles from "./HelpSupport.module.scss";

function HelpSupport() {
  return (
    <>
      <NavBarFree />
      <div className={styles.body}>
        <Header />
        <Input />
        <Cards />
        <div className={styles.article}>
          <Articles />
        </div>
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default HelpSupport;
