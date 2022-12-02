import { PropTypes } from "prop-types";
import React from "react";
import searchIcon from "./searchIcon.svg";
import styles from "./searchinput.module.scss";

/**
 * A component that renders a search input field and accepts a className prop that is of type string and is required.
 * @name SearchInput
 * @param {string} className
 * @returns the search input component with the given className
 */

const SearchInput = ({ className, inputValue }) => {
  const [searchValue, setSearchValue] = React.useState("");

  const getSearchValue = (e) => {
    setSearchValue(e.target.value);
    inputValue(e);
  };

  return (
    <div className={styles[`${className}`]}>
      <img src={searchIcon} alt="" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => getSearchValue(e)}
      />
    </div>
  );
};

// type validation
SearchInput.propTypes = {
  className: PropTypes.string.isRequired,
  inputValue: PropTypes.func.isRequired,
};

export default SearchInput;
