import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Plans from "./Plans";
import styles from "./Pricing.module.scss";

function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | Heed</title>
        <meta
          name="description"
          content="Heed Plans for every stage of your customer success team"
        />
        <meta
          name="keywords"
          content="Heed, pricing, cost, pricing plans, pricing packages, special offers"
        />
      </Helmet>
      <div className={styles.pricing}>
        <div className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h1 className={styles.heroH1}>
                Plans for every stage of your customer{" "}
                <span className={styles.heroAccent}>
                  success team <wbr />
                </span>
              </h1>
              <p className={styles.heroText}>
                Whether your audio files are large or small, we are here to take
                the stress off you{" "}
              </p>
            </div>
            <div className={styles.heroImage}>
              <img
                src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/heroimage_1_znov39.webp"
                alt=""
              />
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584782/Sectionbottom_aunogb.webp"
            alt=""
            className={styles.curves}
          />
        </div>
        <div className={styles.CTA}>
          <h2 className={styles.CTAtitle}>
            Choose a plan that fits your needs
          </h2>
        </div>
        <div>
          <div>
            <Plans />
          </div>
        </div>

        <div className={styles.features}>
          <h2 className={styles.Featurestitle}>Features</h2>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Overview</th>
                  <th>Startup</th>
                  <th>Enterprise (Pre recorded)</th>
                  <th>Enterprise (Live stream)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rest APIs</td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Support for 30+ dialects and languages.</td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                </tr>
                <tr>
                  <td> Calculated per second that is transcribed.</td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Live or pre-recorded transcription</td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                </tr>
                <tr>
                  <td>No additional charge for the second audio channel.</td>

                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email-based support service.</td>

                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                  <td>
                    <img
                      src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584783/check_qmeoqn.webp"
                      alt="check-mark icon"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.benefits}>
          <div className={styles.benefitdescription}>
            <h3>Benefits of using Heed</h3>
            <ul>
              <li>
                <span>&bull;</span>Converts recorded calls in MP3 format into
                readable and searchable text.
              </li>
              <li>
                <span>&bull;</span>Automatically analyzes the transcribed text
                to give each transcription a positive, negative, or neutral
                sentiment score.
              </li>
              <li>
                <span>&bull;</span>Intelligent reporting on customers&apos;
                engagement and call agents' efficiency.
              </li>
            </ul>
            <div className={styles.benefitCTA}>
              <Link to="/try">Try for Free</Link>
              {/* <Link to="/demos">Schedule a Demo</Link> */}
            </div>
          </div>
          <div className={styles.BenefitsImage}>
            <img
              src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584784/benefitsimage_qhrsvb.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
