// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import Footer from "../../components/Footer";
import NavBarFree from "../../components/NavbarFree";
import TryHero from "./components/Try_hero/index";
import TryState1 from "./components/Try_state_1/index";

export default function Try() {
  return (
    <section>
      <NavBarFree />
      <TryHero />
      <TryState1 />
      <Footer />
    </section>
  );
}
