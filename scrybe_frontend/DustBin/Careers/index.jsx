import React from "react";
import Main from "./Components/Main";
import "./Style/main.scss";

function Careers() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div>
      <Main />
    </div>
  );
}

export default Careers;
