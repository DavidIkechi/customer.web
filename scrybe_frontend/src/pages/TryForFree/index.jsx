// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
// import "../../components/Try_hero/try_hero.module.css";
import TryHero from "../../components/Try_hero/index";
// import TryState1 from "../../components/Try_state_1/index";
// import TryState3 from "../../components/Try_state_3/index";
import TryState4 from "../../components/Try_state_4/index";

export default function Try() {
  return (
    <section>
      <TryHero />
      {/* <TryState1 /> */}
      {/* <TryState3 /> */}
      <TryState4 />
    </section>
  );
}
