import Header from "../Header/Header";
import HelpSupportNav from "../HelpSupportNav/HelpSupportNav";
import Contact from "../Contact/Contact";
import General1 from "../General1/General1";
import General2 from "../General2/General2";
import { useState } from "react";
import styles from "./General.module.scss";
import NavBar from "../../../../components/navBar";
import Footer from "../../../../components/footer";

function General() {
  const [display, setDisplay] = useState(true);
  return (
    <>
      <NavBar />
      <div className={styles.body}>
        <Header />
        <div className={styles.general}>
          <HelpSupportNav text="General" setDisplay={setDisplay} />
          {display ? <General1 setDisplay={setDisplay} /> : <General2 />}
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default General;
