import { useState } from "react";
import Footer from "../../../../components/Footer";
import NavBarFree from "../../../../components/NavbarFree";
import Contact from "../Contact/Contact";
import General1 from "../General1";
import General2 from "../General2/General2";
import Header from "../Header/Header";
import HelpSupportNav from "../HelpSupportNav/HelpSupportNav";
import styles from "./General.module.scss";

function General() {
  const [display, setDisplay] = useState(true);
  return (
    <>
      <NavBarFree />
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
