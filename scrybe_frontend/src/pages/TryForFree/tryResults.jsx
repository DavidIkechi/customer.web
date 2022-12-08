// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import Footer from "../../components/Footer";
import NavBarFree from "../../components/NavbarFreeTry";
import TryHero from "./components/Try_hero/index";
import TryState4 from "./components/Try_state_4/index";

export default function TryResults() {
  return (
    <section>
      <NavBarFree />
      <TryHero />
      <TryState4 />
      <Footer />
    </section>
  );
}
