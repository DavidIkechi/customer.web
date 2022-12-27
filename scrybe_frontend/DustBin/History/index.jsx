import React, { useState, useEffect, useMemo } from "react";
import data from "./assets/data";
import {
  GridView,
  ListView,
  TitleSection,
  SideBarMobile,
  Pagination,
} from "./component";
import { profileUpload, uploadIcon, buggerMenu } from "./assets/images";
import SideBar from "./component/SideBar";
import styles from "./style.module.scss";
import { HistoryContext } from "./Contexts/HistoryContext";
let PageSize = 10;

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);

  const currHistoryData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const ref = React.useRef(null);
  const refed = React.useRef(null);
  const btnSideClick = ListenForClicks(ref, refed);
  const [isList, setIsList] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
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

  return (
    <div className={styles.history}>
      {show && <SideBarMobile ref={refed} />}

      {width >= 790 ? (
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
          {width >= 790 ? (
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
                className={styles.upload__bugger}
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
        <HistoryContext.Provider
          value={{ setIsGrid, setIsList, currHistoryData }}
        >
          <TitleSection />
          {isGrid && (
            <div className={styles.history__grids}>
              {width >= 768 ? (
                <>
                  {currHistoryData.map((item, i) => (
                    <GridView
                      title={item.name}
                      name={item.agent}
                      review={item.analysis}
                      date={item.date}
                      color={
                        item.analysis.toLowerCase() === "positive"
                          ? "#dbeabb"
                          : item.analysis.toLowerCase() === "negative"
                          ? "#ffc2cb"
                          : "#ececec"
                      }
                      key={i + 1}
                    />
                  ))}
                </>
              ) : (
                <>
                  {currHistoryData.map((item, i) => (
                    <GridView
                      title={item.name}
                      name={item.agent}
                      review={item.analysis}
                      date={item.date}
                      key={i.toLocaleString()}
                      color={
                        item.analysis.toLowerCase() === "positive"
                          ? "#dbeabb"
                          : item.analysis.toLowerCase() === "negative"
                          ? "#ffc2cb"
                          : "#ececec"
                      }
                    />
                  ))}
                </>
              )}
            </div>
          )}
          <div className={styles.history__list}>
            {isList && (
              <>
                {width >= 790 ? (
                  <>
                    <div>
                      <div className={styles.list__header}>
                        <div className={styles.header__title}>
                          <p>File Name</p>
                          <p>Agent</p>
                          <p>Sentiment Result</p>
                          <p>Date Update</p>
                          <p>Length</p>
                        </div>
                      </div>
                      {currHistoryData.map((item, i) => (
                        <ListView
                          title={item.name}
                          name={item.agent}
                          review={item.analysis}
                          date={`${item.date}, ${item.time}`}
                          length={item.lenght}
                          color={
                            item.analysis.toLowerCase() === "positive"
                              ? "#dbeabb"
                              : item.analysis.toLowerCase() === "negative"
                              ? "#ffc2cb"
                              : "#ececec"
                          }
                          key={i + 1}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.list__header}>
                      <div className={styles.header__title}>
                        <p>File Name</p>
                        <p>Agent</p>
                        <p>Sentiment Result</p>
                      </div>
                    </div>
                    {currHistoryData.map((item, i) => (
                      <ListView
                        title={item.name}
                        name={item.agent}
                        review={item.analysis}
                        color={
                          item.analysis.toLowerCase() === "positive"
                            ? "#dbeabb"
                            : item.analysis.toLowerCase() === "negative"
                            ? "#ffc2cb"
                            : "#ececec"
                        }
                        key={i + 1}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </HistoryContext.Provider>
        <div className={styles.history__pagination}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
