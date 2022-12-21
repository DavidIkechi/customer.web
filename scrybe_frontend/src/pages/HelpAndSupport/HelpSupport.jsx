import Articles from "./components/Articles";
import Cards from "./components/Cards/Cards";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import styles from "./HelpSupport.module.scss";

function HelpSupport() {
  return (
    <>
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
