import React from "react";
import { Link } from "react-router-dom";
import styles from "./pressArticle.module.scss";
import pressArtIcon from "./assets/pressArtIcon.png";
import arrowLeft from "./assets/arrow__left.png";

const index = () => {
  return (
    <div>
      <section className={styles.first__section}>
        <div className={styles.sect__container}>
          <div className={styles.first__heading}>
            <h1 className={styles.first__head}>
              Aspect based sentiment analysis using multi-criteria
              decision-making and deep learning under COVID-19 pandemic
            </h1>
          </div>
        </div>
      </section>
      <section className={styles.second__section}>
        <div className={styles.sect__container}>
          <div className={styles.second__flex}>
            <div className={styles.left__container}>
              <div className={styles.left__hero}>
                <img
                  src={pressArtIcon}
                  alt="Hero Icon of Press Article page"
                  className={styles.hero__icon}
                />
              </div>
              <div className={styles.left__date}>
                <p className={styles.date__month}>Nov 16th </p>
              </div>
              <div className={styles.left__subtext}>
                <p className={styles.left__text}>
                  The COVID-19 pandemic has a significant impact on the global
                  economy and health. While the pandemic continues to cause
                  casualties in millions, many countries have gone under
                  lockdown. During this period, people have to stay within walls
                  and become more addicted towards social networks. They express
                  their emotions and sympathy via these online platforms. Thus,
                  popular social media (Twitter and Facebook) have become rich
                  sources of information for Opinion Mining and Sentiment
                  Analysis on COVID-19-related issues. We have used Aspect Based
                  Sentiment Analysis to anticipate the polarity of public
                  opinion underlying different aspects from Twitter during
                  lockdown and stepwise unlock phases.The COVID-19 pandemic has
                  a significant impact on the global economy and health. While
                  the pandemic continues to cause casualties in millions, many
                  countries have gone under lockdown. During this period, people
                  have to stay within walls and become more addicted towards
                  social networks. They express their emotions and sympathy via
                  these online platforms.
                  <span className={styles.desktop__text}>
                    Thus, popular social media (Twitter and Facebook) have
                    become rich sources of information for Opinion Mining and
                    Sentiment Analysis on COVID-19-related issues. We have used
                    Aspect Based Sentiment Analysis to anticipate the polarity
                    of public opinion underlying different aspects from Twitter
                    during lockdown and stepwise unlock phases.The COVID-19
                    pandemic has a significant impact on the global economy and
                    health. While the pandemic continues to cause casualties in
                    millions, many countries have gone under lockdown. During
                    this period, people have to stay within walls and become
                    more addicted towards social networks. They express their
                    emotions and sympathy via these online platforms. Thus,
                    popular social media (Twitter and Facebook) have become rich
                    sources of information for Opinion Mining and Sentiment
                    Analysis on COVID-19-related issues. We have used Aspect
                    Based Sentiment Analysis to anticipate the polarity of
                    public opinion underlying different aspects from Twitter
                    during lockdown and stepwise unlock phases.The COVID-19
                    pandemic has a significant impact on the global economy and
                    health. While the pandemic continues to cause casualties in
                    millions, many countries have gone under lockdown. During
                    this period, people have to stay within walls and become
                    more addicted towards social networks. They express their
                    emotions and sympathy via these online platforms. Thus,
                    popular social media (Twitter and Facebook) have become rich
                    sources of information for Opinion Mining and Sentiment
                    Analysis on COVID-19-related issues. We have used Aspect
                    Based Sentiment Analysis to anticipate the polarity of
                    public opinion underlying different aspects from Twitter
                    during lockdown and stepwise unlock phases.
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div className={styles.right__container}>
              <div className={styles.right__heading}>
                <h3 className={styles.right__head}>More stories</h3>
              </div>
              <div className={styles.article__container}>
                <div className={styles.article__heading}>
                  <h4 className={styles.article__head}>
                    Social Media sentiment analysis using twitter datasets
                  </h4>
                </div>
                <div className={styles.article__subtext}>
                  <p className={styles.article__text}>
                    Several hundreds of thousands of raw data are uploaded...
                  </p>
                </div>
                <div className={styles.article__details}>
                  <Link className={styles.read__more} to="/press-article">
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
              <div className={styles.article__container}>
                <div className={styles.article__heading}>
                  <h4 className={styles.article__head}>
                    Social Media sentiment analysis using twitter datasets
                  </h4>
                </div>
                <div className={styles.article__subtext}>
                  <p className={styles.article__text}>
                    Several hundreds of thousands of raw data are uploaded...
                  </p>
                </div>
                <div className={styles.article__details}>
                  <Link className={styles.read__more} to="/press-article">
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
              <div className={styles.article__container}>
                <div className={styles.article__heading}>
                  <h4 className={styles.article__head}>
                    Social Media sentiment analysis using twitter datasets
                  </h4>
                </div>
                <div className={styles.article__subtext}>
                  <p className={styles.article__text}>
                    Several hundreds of thousands of raw data are uploaded...
                  </p>
                </div>
                <div className={styles.article__details}>
                  <Link className={styles.read__more} to="/press-article">
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
              <div className={styles.desktop__view}>
                <div className={styles.article__heading}>
                  <h4 className={styles.article__head}>
                    Social Media sentiment analysis using twitter datasets
                  </h4>
                </div>
                <div className={styles.article__subtext}>
                  <p className={styles.article__text}>
                    Several hundreds of thousands of raw data are uploaded...
                  </p>
                </div>
                <div className={styles.article__details}>
                  <Link className={styles.read__more} to="/press-article">
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
              <div className={styles.desktop__view}>
                <div className={styles.article__heading}>
                  <h4 className={styles.article__head}>
                    Social Media sentiment analysis using twitter datasets
                  </h4>
                </div>
                <div className={styles.article__subtext}>
                  <p className={styles.article__text}>
                    Several hundreds of thousands of raw data are uploaded...
                  </p>
                </div>
                <div className={styles.article__details}>
                  <Link className={styles.read__more} to="/press-article">
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
              <div className={styles.desktop__view}>
                <div className={styles.article__heading}>
                  <h4 className={styles.article__head}>
                    Social Media sentiment analysis using twitter datasets
                  </h4>
                </div>
                <div className={styles.article__subtext}>
                  <p className={styles.article__text}>
                    Several hundreds of thousands of raw data are uploaded...
                  </p>
                </div>
                <div className={styles.article__details}>
                  <Link className={styles.read__more} to="/press-article">
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
        </div>
      </section>
    </div>
  );
};

export default index;
