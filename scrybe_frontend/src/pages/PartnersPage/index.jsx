import React from "react";
import styles from "./partners.module.scss";
import heroIcon from "./assets/hero__image.png";
import layoutIcon from "./assets/layout__three-hero.png";
import footIcon from "./assets/footer__init.png";
import google from "./assets/google.png";
import microsoft from "./assets/microsoft.png";
import hotel from "./assets/hotel.png";
import payooneer from "./assets/payooneer.png";
import oneIcon from "./assets/one__icon.png";
import twoIcon from "./assets/two__icon.png";
import threeIcon from "./assets/three__icon.png";
import fourIcon from "./assets/four__icon.png";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import input__ctrl from "../PartnersPage/assets/input__ctrl.png";

const PartnersPage = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <section className={styles.first__sect}>
        <div className={styles.sect__container}>
          <div className={styles.first__flex}>
            <div className={styles.first__right}>
              <img src={heroIcon} alt="Hero icon of the page" />
            </div>
            <div className={styles.first__left}>
              <div className={styles.first__heading}>
                <h1 className={styles.first__head}>
                  Grow with us,
                  <br /> Become a Partner
                </h1>
              </div>
              <div className={styles.first__subhead}>
                <p className={styles.first__subtext}>
                  Once you become a partner, we recognize you officially as a
                  VIP User of Srcybe with added features and benefits.
                  Let&apos;s work together. Join our community of partners to
                  grow your business and solve the problems of others.
                  <span className={styles.first__inline}>
                    <a href="/" className={styles.first__inline}>
                      Learn more
                    </a>
                  </span>
                </p>
              </div>
              <div className={styles.first__input}>
                <div className={styles.email__container}>
                  <input
                    type="email"
                    placeholder="Email address"
                    className={styles.first__field}
                  />
                </div>
                <div className={styles.partner__container}>
                  <input
                    type="submit"
                    value="Become a Partner"
                    className={styles.first__botton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.second__sect}>
        <div className={styles.sect__container}>
          <div className={styles.second__content}>
            <div className={styles.second__social}>
              <div className={styles.second__each}>
                <img
                  src={google}
                  alt="google-icon"
                  className={styles.social__icons}
                />
              </div>
              <div className={styles.second__each}>
                <img
                  src={microsoft}
                  alt="microsoft-icon"
                  className={styles.social__icons}
                />
              </div>
            </div>
            <div className={styles.second__social}>
              <div className={styles.second__each}>
                <img
                  src={hotel}
                  alt=" hotel-icon"
                  className={styles.social__icons}
                />
              </div>
              <div className={styles.second__each}>
                <img
                  src={payooneer}
                  alt="payooneer"
                  className={styles.social__icons}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.third__section}>
        <div className={styles.sect__container}>
          <div className={styles.third__flex}>
            <div className={styles.third__left}>
              <img src={layoutIcon} alt="Layout three section hero icon" />
            </div>
            <div className={styles.third__right}>
              <div className={styles.third__heading}>
                <h2 className={styles.third__head}>
                  Why Join Our Partner Program
                </h2>
              </div>
              <div className={styles.third__content}>
                <div className={styles.third__btm}>
                  <div className={styles.btm__left}>
                    <div className={styles.btm__icon}>
                      <img src={oneIcon} alt="Layout three section hero icon" />
                    </div>
                    <div className={styles.bars} />
                  </div>
                  <div className={styles.btm__right}>
                    <h4 className={styles.btm__head}>Service Offering</h4>
                    <div className={styles.btm__subhead}>
                      <p className={styles.btm__subtext}>
                        Increase the value of your customer service, get VIP
                        access to the most intelligent tool to help your
                        business grow
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.third__btm}>
                  <div className={styles.btm__left}>
                    <div className={styles.btm__icon}>
                      <img src={twoIcon} alt="Layout three section hero icon" />
                    </div>
                    <div className={styles.bars} />
                  </div>
                  <div className={styles.btm__right}>
                    <h4 className={styles.btm__head}>
                      VIP training & Onboarding
                    </h4>
                    <div className={styles.btm__subhead}>
                      <p className={styles.btm__subtext}>
                        Full access to our learning library, for your entire
                        team to receive product training and our premium
                        onboarding packages
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.third__btm}>
                  <div className={styles.btm__left}>
                    <div className={styles.btm__icon}>
                      <img
                        src={threeIcon}
                        alt="Layout three section hero icon"
                      />
                    </div>
                    <div className={styles.bars} />
                  </div>
                  <div className={styles.btm__right}>
                    <h4 className={styles.btm__head}>Marketing Support</h4>
                    <div className={styles.btm__subhead}>
                      <p className={styles.btm__subtext}>
                        We will work together to create awareness of your
                        company/agency through opportunity, event
                        invitation/partnership, co-marketing initiatives, etc.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.third__btm}>
                  <div className={styles.btm__left}>
                    <div className={styles.btm__icon}>
                      <img
                        src={fourIcon}
                        alt="Layout three section hero icon"
                      />
                    </div>
                  </div>
                  <div className={styles.btm__right}>
                    <h4 className={styles.btm__head}>Shared Revenue</h4>
                    <div className={styles.btm__subhead}>
                      <p className={styles.btm__subtext}>
                        A special reward for each referral, measured with an
                        industry-leading revenue share
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.btm__subhead}>
                  <p className={styles.btm__subtext}>
                    For more inquiries and questions on our partner&apos;s
                    program, send a mail to partner@scrybe.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.fourth__section}>
        <div className={styles.sect__container}>
          <div className={styles.fourth__content}>
            <div className={styles.fourth__heading}>
              <h3 className={styles.fourth__head}>
                Help more companies discover the power of Scrybe
              </h3>
            </div>
            <div className={styles.fourth__action}>
              <button type="button" className={styles.fourth__btn}>
                Join our Premium Partners Today
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.fifth__section}>
        <div className={styles.sect__container}>
          <div>
            <div className={styles.form__top}>
              <div className={styles.form__heading}>
                <h2 className={styles.form__head}>Partner with Scrybe</h2>
              </div>
              <div className={styles.form__subhead}>
                <p className={styles.form__subtext}>
                  Drop details below and we get back to you as soon as possible
                </p>
              </div>
            </div>
            <div className={styles.form__section}>
              <form className={styles.form__container}>
                <div className={styles.input__overall}>
                  <div className={styles.input__content}>
                    <div className={styles.input__flex}>
                      <label
                        htmlFor="company__name"
                        className={styles.label__name}
                      >
                        Company Name
                        <input
                          type="text"
                          id="company__name"
                          className={styles.company__name}
                          placeholder="Enter your company name"
                        />
                      </label>
                    </div>
                    <div className={styles.input__flex}>
                      <label
                        htmlFor="company__email"
                        className={styles.label__name}
                      >
                        Company Email
                        <input
                          type="email"
                          id="company__email"
                          className={styles.company__email}
                          placeholder="Enter your company email"
                        />
                      </label>
                    </div>
                  </div>
                  <div className={styles.input__content}>
                    <div className={styles.input__flex}>
                      <label
                        htmlFor="employees__number"
                        className={styles.label__name}
                      >
                        Number of Employees
                        <input
                          type="number"
                          id="employees__number"
                          className={styles.employees__number}
                          placeholder="E.g:  24"
                        />
                      </label>
                      <span className={styles.ctrl__input}>
                        <img
                          src={input__ctrl}
                          alt="Input control"
                          className={styles.input__ctrlicon}
                        />
                      </span>
                    </div>
                    <div className={styles.input__flex}>
                      <label
                        htmlFor="customer__number"
                        className={styles.label__name}
                      >
                        Number of Customers
                        <input
                          type="number"
                          id="customer__number"
                          className={styles.customer__number}
                          placeholder="E.g:  24"
                        />
                      </label>
                      <span className={styles.ctrl__input}>
                        <img
                          src={input__ctrl}
                          alt="Input control"
                          className={styles.input__ctrlicon}
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="customer__address"
                      className={styles.label__name}
                    >
                      Company Address
                      <input
                        type="text"
                        id="customer__address"
                        className={styles.customer__address}
                        placeholder="Enter your company address"
                      />
                    </label>
                  </div>
                  <div className={styles.input__content}>
                    <div className={styles.input__flex}>
                      <label htmlFor="city" className={styles.label__name}>
                        City
                        <input
                          type="text"
                          id="city"
                          className={styles.city}
                          placeholder="City"
                        />
                      </label>
                    </div>
                    <div className={styles.input__flex}>
                      <label htmlFor="state" className={styles.label__name}>
                        State/Province
                        <input
                          type="text"
                          id="state"
                          className={styles.state}
                          placeholder="State/Province"
                        />
                      </label>
                    </div>
                  </div>
                  <div className={styles.input__btn}>
                    <input
                      type="submit"
                      id="submit__btn"
                      className={styles.submit__btn}
                      value="SUBMIT"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.fifth__btm}>
            <div className={styles.fifth__content}>
              <div className={styles.fifth__right}>
                <img src={footIcon} alt="Icon before the footer" />
              </div>
              <div className={styles.fifth__left}>
                <div className={styles.fifth__heading}>
                  <h5 className={styles.fifth__head}>
                    Getting Started is Easy
                  </h5>
                </div>
                <div className={styles.fifth__subhead}>
                  <p className={styles.fifth__subtext}>
                    We are confident that you will get the best value from our
                    products
                  </p>
                </div>
                <div className={styles.fifth__action}>
                  <div className={styles.fifth__btn}>
                    <button type="button" className={styles.btn__act}>
                      Try for Free
                    </button>
                  </div>
                  <div className={styles.fifth__secondbtn}>
                    <button type="submit" className={styles.btn__secondact}>
                      Schedule a Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.footer__container}>
        <Footer />
      </div>
    </div>
  );
};

export default PartnersPage;
