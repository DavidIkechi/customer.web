// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import Footer from "../../components/footer";
import NavBarFree from "../../components/navBar_free";
import TryHero from "./components/Try_hero/index";
import TryState3 from "./components/Try_state_3/index";
// import TryState4 from "./components/Try_state_4/index";

export default function TryProcessing() {
  return (
    <section>
      <NavBarFree />
      <TryHero />
      <TryState3 />
      <Footer />
    </section>
  );
}
