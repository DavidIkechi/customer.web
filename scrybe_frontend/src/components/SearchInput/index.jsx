import { PropTypes } from "prop-types";
import React from "react";
import { dispatch } from "../../redux/store";
import { setSearchQuery } from "../../redux/utils/UtilSlice";
import searchIcon from "./searchIcon.svg";
import styles from "./searchinput.module.scss";

/**
 * A component that renders a search input field and accepts a className prop that is of type string and is required.
 * @name SearchInput
 * @param {string} className
 * @returns the search input component with the given className
 */

const SearchInput = ({ inputValue }) => {
  const getSearchValue = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.sidebar_input}>
      <div className={styles.sidebar_inputWrap}>
        <img src={searchIcon} alt="" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => getSearchValue(e)}
        />
      </div>
    </div>
  );
};

// type validation
SearchInput.propTypes = {
  inputValue: PropTypes.func.isRequired,
};

export default SearchInput;
