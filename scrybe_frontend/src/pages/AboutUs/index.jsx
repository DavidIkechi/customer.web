import React from "react";
import styles from "./About.module.scss";
import icon1 from "./assets/icon1.svg";
import icon2 from "./assets/icon2.svg";
import icon3 from "./assets/icon3.svg";
import icon4 from "./assets/icon4.svg";
import partner1 from "./assets/partner1.svg";
import partner2 from "./assets/partner2.svg";
import partner3 from "./assets/partner3.svg";
import partner4 from "./assets/partner4.svg";

function About() {
  return (
    <>
      <section className={styles.first__section}>
        <div className={styles.sect__container}>
          <div className={styles.first__top}>
            <div className={styles.first__heading}>
              <h1 className={styles.first__head}>
                Heed helps sales managers work{" "}
                <span className={styles.first__inline}>faster</span>, with
                <span className={styles.first__inline}> simplified roles</span>
              </h1>
            </div>
          </div>
          <div className={styles.first__bottom}>
            <div className={styles.first__subtext}>
              <p className={styles.first__subhead}>
                At Heed, we transcribe call recordings between customer support
                agents and customers to give sentimental analysis as we analyze
                transcriptions to give sentiment score of the conversation
                (Positive, Neutral or Negative)
              </p>
              <p className={styles.first__subhead}>
                At Heed, our mission is to provide businesses with intelligent,
                accurate, and precise intent analysis to improve customer
                experience. We believe that through the power of artificial
                intelligence, we can make a real difference in the way
                businesses interact with their customers.
              </p>
              <p className={styles.first__subhead}>
                We believe that we can come together, to make the business world
                better for all and this is what we are forever committed to. Our
                slogan is{" "}
                <span className={styles.subhead__inline}>Speak, we listen</span>
              </p>
            </div>
            <div className={styles.hero__image}>
              <img
                src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579336/hero__icon_p0nom4.webp"
                alt="hero figure"
                className={styles.hero__figure}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.second__section}>
        <div className={styles.sect__container}>
          <div className={styles.head__container}>
            <h2 className={styles.second__head}>Our core values</h2>
          </div>
          <div className={styles.second__bottom}>
            <div className={styles.second__row}>
              <div className={styles.each__box}>
                <div className={styles.heading__icon}>
                  <h4 className={styles.box__head}>Company's Success</h4>
                  <div className={styles.core__icons}>
                    <img src={icon3} alt="core icons" />
                  </div>
                </div>
                <p className={styles.box__text}>
                  Our number one goal is to see our customers suceed at
                  business. We will go above and beyond to assist businesses to
                  ensure they are getting the best service from us.
                </p>
              </div>
              <div className={styles.each__box}>
                <div className={styles.heading__icon}>
                  <h4 className={styles.box__head}>Data Safety</h4>
                  <div className={styles.core__icons}>
                    <img src={icon2} alt="core icons" />
                  </div>
                </div>
                <p className={styles.box__text}>
                  All our customers data are safe. We garuantee security of
                  conversations uploaded. Be rest assured that only your company
                  can access this data.
                </p>
              </div>
            </div>

            <div className={styles.second__row}>
              <div className={styles.each__box}>
                <div className={styles.heading__icon}>
                  <h4 className={styles.box__head}>Company's Value</h4>
                  <div className={styles.core__icons}>
                    <img src={icon1} alt="core icons" />
                  </div>
                </div>
                <p className={styles.box__text}>
                  Know your support teams individual and collective performance.
                  With Heed, you can discover the insights you need to improve
                  your support teams acquisition, retention, and productivity.
                </p>
              </div>
              <div className={styles.each__box}>
                <div className={styles.heading__icon}>
                  <h4 className={styles.box__head}>Company's History</h4>
                  <div className={styles.core__icons}>
                    <img src={icon4} alt="core icons" />
                  </div>
                </div>
                <p className={styles.box__text}>
                  We are comminted to helping you track your data history. With
                  insights, you see your support team role. with analysis you
                  see records of individual analysed data. With overview you
                  know the summary of all data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.third__section}>
        <div className={styles.sect__container}>
          <div className={styles.third__container}>
            <div className={styles.third__top}>
              <div className={styles.third__heading}>
                <h1 className={styles.third__head}>Partners</h1>
              </div>
              <div className={styles.third__subtext}>
                <p className={styles.third__subhead}>
                  Great Success, they say, is never achieved alone. This is also
                  true for us at Heed. In order to achieve our goals and to
                  offer a better service all customers, we have partnered with a
                  number of brands to achieve these goals.{" "}
                </p>
              </div>
            </div>
            <div className={styles.third__bottom}>
              <div className={styles.each__flex}>
                <div className={styles.third__flex}>
                  <div className={styles.comp__icons}>
                    <img src={partner1} alt="companies icon" />
                  </div>
                  <h4 className={styles.icon__head}>HotelsNg</h4>
                </div>
                <div className={styles.third__flex}>
                  <div className={`${styles.comp__icons} ${styles.desk__icon}`}>
                    <img src={partner4} alt="companies icon" />
                  </div>
                  <h4 className={`${styles.icon__head} ${styles.desk__wrap}`}>
                    The HNG Internship
                  </h4>
                </div>
              </div>
              <div className={`${styles.each__flex} ${styles.reverse}`}>
                <div className={styles.third__flex}>
                  <div className={styles.comp__icons}>
                    <img src={partner3} alt="companies icon" />
                  </div>
                  <h4 className={`${styles.icon__head} ${styles.desk__wrap}`}>
                    BrainBox inc.
                  </h4>
                </div>
                <div className={styles.third__flex}>
                  <div className={styles.comp__icons}>
                    <img src={partner2} alt="companies icon" />
                  </div>
                  <h4 className={styles.icon__head}>HNG i9</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      //{" "}
      <section className={styles.fourth__section}>
        //{" "}
        <div className={styles.sect__container}>
          //{" "}
          <div className={styles.fourth__top}>
            //{" "}
            <div className={styles.fourth__heading}>
              // <h1 className={styles.fourth__head}>Meet Our Team</h1>
              //{" "}
            </div>
            //{" "}
            <div className={styles.fourth__subtext}>
              //{" "}
              <p className={styles.fourth__subhead}>
                // We are a team of Product mangers, designers, developers and
                // sales representatives, under Workshop Apps Ventures studio
                ready // to help sales and customer support teams! //{" "}
              </p>
              //{" "}
            </div>
            //{" "}
          </div>
          //{" "}
        </div>
        //{" "}
      </section>
      {/*   <div className={styles.fourth__bottom}>
            <div className={styles.flex__profile}>
              <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img
                    src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579336/team1_oqsdqn.webp"
                    alt="team members"
                  />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Mark Essien</h5>
                  <p className={styles.profile__desc}>Advisor</p>
                </div>
              </div> 
               <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img
                    src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579336/team2_acaqn4.webp"
                    alt="team members"
                  />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Aigbe Marvelous</h5>
                  <p className={styles.profile__desc}>Advisor</p>
                </div>
              </div>
              <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img
                    // src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579335/team3_tdoajn.webp"
                    src={ceo}
                    alt="team members"
                  />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Collins Akpaka</h5>
                  <p className={styles.profile__desc}>
                    Chief Executive Officer
                  </p>
                </div>
              </div>
               <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img
                    src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579335/team4_p7ykpa.webp"
                    alt="team members"
                  />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Delphine Ogbonna</h5>
                  <p className={styles.profile__desc}>Lead designer</p>
                </div>
              </div> 

               <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img
                    src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579335/team5_hv34zf.webp"
                    alt="team members"
                  />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Ugochukwu Odumegwu</h5>
                  <p className={styles.profile__desc}>Back-End Lead</p>
                </div>
              </div>
              <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img
                    // src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670579335/team6_ezoxjg.webp"
                    src={cto}
                    alt="team members"
                  />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Tochukwu Bedford</h5>
                  <p className={styles.profile__desc}>
                    Chief Technology Officer
                  </p>
                </div>
              </div>
              <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img src={cmo} alt="team members" />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Mary Nwankwoala</h5>
                  <p className={styles.profile__desc}>
                    Chief Marketing Officer
                  </p>
                </div>
              </div>
              <div className={styles.profile__box}>
                <div className={styles.profile__icon}>
                  <img src={cfo} alt="team members" />
                </div>
                <div className={styles.profile__text}>
                  <h5 className={styles.profile__name}>Victor Chukwueke</h5>
                  <p className={styles.profile__desc}>
                    Chief Operation Officer
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.team__content}>
            <Link className={styles.team__expand}>See more in our team</Link>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default About;
