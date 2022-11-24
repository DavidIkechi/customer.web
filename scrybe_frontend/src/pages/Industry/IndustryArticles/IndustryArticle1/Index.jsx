import React from "react";
import styles from "./Industry.module.scss";
import Image from "../../assets/industryImage.png";

function industryArticle() {
  return (
    <div className={styles.industry}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>Industry</h1>
          <p>
            Industry-related news and insights for enterprises building features
            and products with state-of-the-art AI models.
          </p>
        </div>
        <div className={styles.articleBanner}>
          <div className={styles.articleDetails}>
            <h2>Industry</h2>
            <h4>
              <span>Munaike</span>Wednesday 18th Nov. 2022{" "}
            </h4>
            <h3>Why you should embrace Emotional AI - Analytics insights</h3>

            <p>
              We often feel that emotions have no place in business but it is
              the core of what drives it. Humans are emotional and humans build
              and makeup businesses. They&apos;re part of who we are, and
              it&apos;s important to be able to harness their potential.
              Emotions have a significant impact on business and your
              company&apos;s success
            </p>
          </div>
          <div className={styles.titleCard}>
            <img src={Image} alt="" />
          </div>
        </div>
        <div className={styles.articleBody}>
          <div className="one">
            <p>
              Additionally, decision-making, planning, negotiation, and creative
              thinking are all impacted by the emotional state of the brain.
            </p>
            <p>
              People collaborate more effectively and build a more enduring and
              powerful team when they sense that others understand them.
            </p>
            <p>
              In order to succeed in business, we must comprehend and
              individualize experiences. Humans are biased, which is where
              artificial intelligence comes into play. Emotional AI is used to
              accurately and bias-free comprehend the customers.
            </p>
            <p>
              <a href="https://www.uniphore.com/emotion-ai/">Emotional AI</a> is
              the application of artificial intelligence algorithms to
              psychometric data and is used by marketers and customer service
              teams in customer acquisition and retention efforts.
            </p>
            <p>
              The complexity of the human mind may be studied using
              computational power, just like any other machine. In order to
              understand the intricacies of human thought and decision-making,
              emotional AI combines the strength of analytics. This gives you
              the ability to design more perceptive interactions that are suited
              to the requirements of your users (and their quirks).
            </p>
            <p>
              Understanding customer sentiment and brand loyalty can be done
              effectively using analytics. In today&apos;s cutthroat business
              environment, a company&apos;s ability to both attract and retain
              customers directly depends on how it handles its current
              customers.
            </p>
          </div>
          <div>
            <div>
              <p className={styles.bold}>
                How AI Measures Emotion and Captures It
              </p>
              <ul>
                <li>
                  <span>&bull;</span>People not only express their feelings by
                  what they say but also through how they say it.
                </li>
                <li>
                  <span>&bull;</span>Artificial intelligence (AI) can currently
                  assess a person&apos;s voice volume, speed of speech, body
                  language, and facial emotions.
                </li>
                <li>
                  <span>&bull;</span>Additionally, it can detect changes in mood
                  during a conversation.
                </li>
              </ul>
            </div>
            <div>
              <p className={styles.bold}>Benefits of emotion-based AI;</p>
              <ul>
                <li>
                  <span>&bull;</span> Enhanced consumer comprehension: With
                  emotional AI evaluating human interaction for traits like
                  fear, disgust, irritation, delight, contentment, and surprise,
                  brands acquire a deeper grasp of customer mood.
                </li>
                <li>
                  <span>&bull;</span> Contextual awareness is improved Context
                  is essential to understanding a customer&apos;s true feelings.
                </li>
                <li>
                  &bull; A better comprehension of client needs: When a
                  customer&apos;s mood shifts during a contact, brands can learn
                  a lot about their particular demands.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p>
              Hence, real-time emotion AI data may be used by CX leaders to
              determine how strongly a person feels about their products, the
              standard of their customer service, and how that influences
              consumer behavior. Brands may be able to change their short- and
              long-term strategy as a result.
            </p>
            <p>
              Businesses can present enhanced goods and services. Find out what
              services provide clients with a sense of value and happiness, make
              product roadmaps better, adapt products and services to the
              requirements of each client, customize CX (customer experience)
              and increase team performance and improve engagement.
            </p>
            <p>
              Emotions are a potent tool for building human connections,
              enhancing customer experiences, and attracting customers to a
              company. Emotional AI is an emerging platform that aims to change
              the way we do business.
            </p>
            <p>Smart business leaders have keyed in and so should you.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default industryArticle;
