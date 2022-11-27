import React, { useState, useEffect } from "react";
import data from "./assets/data";
import { GridView, ListView, TitleSection, SideBarMobile } from "./component";
import { profileUpload, uploadIcon, buggerMenu } from "./assets/images";
import SideBar from "./component/SideBar";
import styles from "./style.module.scss";

export default function History() {
  const ref = React.useRef(null);
  const refed = React.useRef(null);
  const btnSideClick = ListenForClicks(ref, refed);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  function handleClick() {
    setShow((prev) => !prev);
  }
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function ListenForClicks(ref, refed) {
    const [isClicked, setIsClicked] = useState();
    useEffect(() => {
      function handleClicks(e) {
        if (ref.current === e.target) {
          setIsClicked((current) => !current);
        }
        if (refed.current === e.target) {
          handleClick();
        } else {
          return;
        }
      }

      document.addEventListener("click", handleClicks);
      return () => {
        document.removeEventListener("click", handleClicks);
      };
    }, [ref, refed]);
    return isClicked;
  }
  // const recordList = data.map((item) => (
  //   <List
  //     name={item.name}
  //     agent={item.agent}
  //     analysis={item.analysis}
  //     date={item.date}
  //     time={item.time}
  //     lenght={item.lenght}
  //   />
  // ));

  // const [show, setShow] = useState(true);

  return (
    <div className={styles.history}>
      {show && <SideBarMobile ref={refed} />}

      {width >= 768 ? (
        <div className={styles.history__sidebar}>
          <SideBar ref={ref} />
        </div>
      ) : (
        ""
      )}
      <div
        className={
          btnSideClick
            ? `${styles.history__content}`
            : `${styles.small__margin}`
        }
      >
        <div className={styles.history__listHeader}>
          {width >= 768 ? (
            <>
              <div className={styles.inputWithIcon}>
                <input
                  type="text"
                  name=""
                  id="search-bar"
                  placeholder="Search"
                />
              </div>
              <div className={styles.upload_profile_container}>
                <img src={profileUpload} className="" alt="hero img" />
                <button className={styles.Upload_button}>
                  <img src={uploadIcon} alt="" />
                  upload
                </button>
              </div>
            </>
          ) : (
            <div className={styles.upload__md}>
              <img
                src={buggerMenu}
                alt="icon"
                ref={ref}
                onClick={handleClick}
              />
              <div>
                <button className={styles.uploadBtn__md}>
                  <img src={uploadIcon} alt="" />
                  upload
                </button>
              </div>
            </div>
          )}
        </div>

        <TitleSection />
        <div className={styles.history__grids}>
          {data.map((item, i) => (
            <GridView
              title={item.name}
              name={item.agent}
              review={item.analysis}
              date={item.date}
              key={i + 1}
            />
          ))}
        </div>
      </div>
      {/* <Filter onClose={() => setShow(false)} show={show} />
      <div className={styles.record}>{recordGrid}</div>
      <div className={styles.list__div}>
        {recordList}
      </div> */}
    </div>
  );
}
