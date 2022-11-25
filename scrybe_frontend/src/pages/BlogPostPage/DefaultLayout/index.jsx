import PropTypes from "prop-types";
import React from "react";
import utils from "../assets/utils.module.scss";
import styles from "./styles.module.scss";
import { insta01, insta02, insta03 } from "../../BlogsPage/assets";
import ImageSlider from "../../BlogsPage/ImageSlider";
import Footer from "../../../components/footer";
function DefaultLayout(props) {
  const { children } = props;
  const slides = [
    {
      url: insta01,
    },
    {
      url: insta02,
    },
    {
      url: insta03,
    },
  ];

  return (
    <div className={styles.default_layout}>
      <div>{children}</div>

      <div className={styles.default_layout__instagram}>
        <div className={utils.d_grid} style={{ "--gap": "32px" }}>
          <div className={utils.container}>
            <h3 className={styles.default_layout__section_title}>
              Instagram Posts
            </h3>
          </div>

          {/* slider */}
          <div className={styles.blogs__carousel}>
            <ImageSlider slides={slides} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.defaultProps = {
  children: null,
};

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default DefaultLayout;
