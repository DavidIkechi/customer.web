import React from "react";
import { Link } from "react-router-dom";
import styles from "./press.module.scss";
import pressCardone from "./assets/pressCardone.png";
import pressCardtwo from "./assets/pressCardtwo.png";
import pressCardthree from "./assets/pressCardthree.png";
import pressSmcardOne from "./assets/pressSmcardOne.png";
import pressSmcardTwo from "./assets/pressSmcardTwo.png";
import pressSmcard from "./assets/pressSmcard.png";
import headDot from "./assets/headDot.png";
import arrowLeft from "./assets/arrow__left.png";
import whiteArrowleft from "./assets/whiteArrowleft.png";
import logoText from "./assets/logoText.png";
import bannerImage from "./assets/bannerImage.png";
import cardlogo from "./assets/cardlogo.png";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

const index = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <section className={styles.section__one}>
        <div className={styles.sect__container}>
          <div className={styles.hero__heading}>
            <h1 className={styles.hero__head}>
              <span className={styles.hero__inline}>News</span>room
            </h1>
            <div className={styles.head__dot}>
              <img src={headDot} alt="Full stop" />
            </div>
          </div>
          <div className={styles.hero__subhead}>
            <p className={styles.hero__subtext}>
              Get access to our news, Updates, and Notifications
            </p>
          </div>
        </div>
      </section>
      <section
        className={styles.section__two}
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 250,
          width: "100%",
        }}
      >
        <div className={styles.sect__container}>
          <div className={styles.banner__flex}>
            <div className={styles.left__ban}>
              <div className={styles.ban__heading}>
                <h2 className={styles.ban__head}>Article of the day</h2>
              </div>
              <div className={styles.ban__subhead}>
                <p className={styles.ban__subtext}>
                  Aspect based sentiment analysis using multi-criteria
                  decision-making and deep learning under COVID-19 pandemic
                </p>
              </div>
            </div>
            <div className={styles.right__ban}>
              <div className={styles.banner__details}>
                <Link className={styles.banner__read} to="/press-article">
                  Read more
                </Link>
                <span>
                  <img
                    src={whiteArrowleft}
                    alt="Arrow action to another"
                    className={styles.arrowpoint}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section__three}>
        <div className={styles.sect__container}>
          <div className={styles.three__center}>
            <div className={styles.three__left}>
              <img src={logoText} alt="Scrybe Text" />
            </div>
            <div className={styles.three__right}>
              <div className={styles.three__top}>
                <p className={styles.three__heading}>
                  An AI powered tool tailored for customers success and
                  satisfaction
                </p>
              </div>
              <div className={styles.threemobile__bottom}>
                <div className={styles.three__flex}>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>2022</p>
                    <p className={styles.three__text}>Founded</p>
                  </div>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>200+</p>
                    <p className={styles.three__text}>Employees</p>
                  </div>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>Get in touch</p>
                    <p className={styles.three__text}>info@scrybe.co.za</p>
                  </div>
                </div>
                <div className={styles.three__flex}>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>20+</p>
                    <p className={styles.three__text}>Active Users</p>
                  </div>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>Headquartered</p>
                    <p className={styles.three__text}>in Abuja Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.three__desktop}>
              <div className={styles.three__top}>
                <p className={styles.three__heading}>
                  An AI powered tool tailored for customers success and
                  satisfaction
                </p>
              </div>
              <div className={styles.threedesk__bottom}>
                <div className={styles.three__flex}>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>2022</p>
                    <p className={styles.three__text}>Founded</p>
                  </div>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>200+</p>
                    <p className={styles.three__text}>Employees</p>
                  </div>
                </div>
                <div className={styles.three__flex}>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>20+</p>
                    <p className={styles.three__text}>Active Users</p>
                  </div>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>Headquartered</p>
                    <p className={styles.three__text}>in Abuja Nigeria</p>
                  </div>
                </div>
                <div className={styles.three__flex}>
                  <div className={styles.three__each}>
                    <p className={styles.three__head}>Get in touch</p>
                    <p className={styles.three__text}>info@scrybe.co.za</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section__four}>
        <div className={styles.sect__container}>
          <div className={styles.four__heading}>
            <h2 className={styles.four__head}>Featured</h2>
          </div>
          <div className={styles.four__cards}>
            <div
              className={styles.card__container}
              style={{
                backgroundImage: `url(${pressCardone})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 180,
                width: 180,
              }}
            >
              <div className={styles.card__content}>
                <div className={styles.card__heading}>
                  <h3 className={styles.card__head}>
                    Pricing <br /> Update
                  </h3>
                </div>
                <div className={styles.card__subhead}>
                  <p className={styles.card__subtext}>
                    Scrybre was birthed from the need to provide a more...
                  </p>
                </div>
                <div className={styles.banner__details}>
                  <Link className={styles.banner__read} to="/">
                    Learn more
                  </Link>
                  <span>
                    <img
                      src={whiteArrowleft}
                      alt="Arrow action to another"
                      className={styles.arrowpoint}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={styles.card__container}
              style={{
                backgroundImage: `url(${pressCardtwo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 180,
                width: 180,
              }}
            >
              <div className={styles.card__content}>
                <div className={styles.card__heading}>
                  <h3 className={styles.card__head}>The Partnership</h3>
                </div>
                <div className={styles.card__logo}>
                  <img src={cardlogo} alt="Logo of scrybe and hotel ng" />
                </div>
                <div
                  className={styles.banner__details}
                  style={{ marginTop: "1em" }}
                >
                  <Link className={styles.banner__read} to="/">
                    Learn more
                  </Link>
                  <span>
                    <img
                      src={whiteArrowleft}
                      alt="Arrow action to another"
                      className={styles.arrowpoint}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={styles.card__container}
              style={{
                backgroundImage: `url(${pressCardthree})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 180,
                width: 180,
              }}
            >
              <div className={styles.card__content}>
                <div className={styles.card__heading}>
                  <h3 className={styles.card__head}>Our Success Story</h3>
                </div>
                <div className={styles.card__subhead}>
                  <p className={styles.card__subtext}>
                    Scrybre was birthed from the need to provide a more...
                  </p>
                </div>
                <div className={styles.banner__details}>
                  <Link className={styles.banner__read} to="/">
                    Learn more
                  </Link>
                  <span>
                    <img
                      src={whiteArrowleft}
                      alt="Arrow action to another"
                      className={styles.arrowpoint}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={styles.card__container}
              style={{
                backgroundImage: `url(${pressCardone})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 180,
                width: 180,
              }}
            >
              <div className={styles.card__content}>
                <div className={styles.card__heading}>
                  <h3 className={styles.card__head}>
                    Pricing <br /> Update
                  </h3>
                </div>
                <div className={styles.card__subhead}>
                  <p className={styles.card__subtext}>
                    Scrybre was birthed from the need to provide a more...
                  </p>
                </div>
                <div className={styles.banner__details}>
                  <Link className={styles.banner__read} to="/">
                    Learn more
                  </Link>
                  <span>
                    <img
                      src={whiteArrowleft}
                      alt="Arrow action to another"
                      className={styles.arrowpoint}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section__five}>
        <div className={styles.sect__container}>
          <div className={styles.five__top}>
            <div className={styles.five__links}>
              <p className={styles.point__link}>Latest news</p>
            </div>
            <div className={styles.five__pointlinks}>
              <a href="/" className={styles.point__link}>
                Brand guideline
              </a>
            </div>
          </div>
          <div className={styles.five__desktop}>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardOne}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Twitter users commend the rising transcription and sentiment
                  analysis tool- Scrybe.
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  We&apos;ve seen scrybers take to twitt..
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardTwo}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Aspect based sentiment analysis using multi-criteria
                  decision-making
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  The covid-19 pandemic has had a significant impact on the
                  global a
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcard}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Twitter users commend the rising transcription and sentiment
                  analysis tool- Scrybe.
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  We&apos;ve seen scrybers take to twitt..
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcard}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Twitter users commend the rising transcription and sentiment
                  analysis tool- Scrybe.
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  We&apos;ve seen scrybers take to twitt..
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardTwo}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Aspect based sentiment analysis using multi-criteria
                  decision-making
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  The covid-19 pandemic has had a significant impact on the
                  global a
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardOne}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Twitter users commend the rising transcription and sentiment
                  analysis tool- Scrybe.
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  We&apos;ve seen scrybers take to twitt..
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardTwo}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Aspect based sentiment analysis using multi-criteria
                  decision-making
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  The covid-19 pandemic has had a significant impact on the
                  global a
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardTwo}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Aspect based sentiment analysis using multi-criteria
                  decision-making
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  The covid-19 pandemic has had a significant impact on the
                  global a
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.five__bottom}>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardOne}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Social Media sentiment analysis using twitter datasets
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  Several hundreds of thousands of raw data are...
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
            <div className={styles.five__articles}>
              <div className={styles.article__icon}>
                <img
                  src={pressSmcardTwo}
                  alt="Icon of Press cards"
                  className={styles.each__icon}
                />
              </div>
              <div className={styles.five__heading}>
                <h3 className={styles.five__head}>
                  Social Media sentiment analysis using twitter datasets
                </h3>
              </div>
              <div className={styles.five__subtext}>
                <p className={styles.five__texts}>
                  Several hundreds of thousands of raw data are...
                </p>
              </div>
              <div className={styles.more__details}>
                <Link className={styles.read__more} to="/">
                  Read more
                </Link>
                <span>
                  <img
                    src={arrowLeft}
                    alt="Arrow action to another"
                    className={styles.arrowleft}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default index;
