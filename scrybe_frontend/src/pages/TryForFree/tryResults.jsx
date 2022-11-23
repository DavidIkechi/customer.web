// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import Footer from "../../components/footer";
import NavBarFree from "../../components/navBar_free";
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
