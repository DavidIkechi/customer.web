import React from "react";
import Proptypes from "prop-types";
import Dummy from "../../components/Dummy";

function DummyPage({ someText }) {
  return <Dummy someText={someText} />;
}

DummyPage.defaultProps = {
  someText: "",
};

DummyPage.propTypes = {
  someText: Proptypes.string,
};

export default DummyPage;
