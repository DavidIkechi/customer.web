import Footer from "../../components/footer";
import NavBar from "../../components/navBar";
import Articles from "./components/Articles/Articles";
import Cards from "./components/Cards/Cards";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import styles from "./HelpSupport.module.scss";

function HelpSupport() {
  return (
    <>
      <NavBar />
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
