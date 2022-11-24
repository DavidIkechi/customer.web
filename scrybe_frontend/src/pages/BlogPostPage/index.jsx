/* eslint-disable react/no-unescaped-entities */
import React from "react";
import DefaultLayout from "./DefaultLayout";
import image from "./assets/post.png";
import blogImage from "./assets/blog_image.png";
import arrowLeft from "./assets/arrow_left.svg";
import arrowRight from "./assets/arrow_right.svg";
import utils from "./assets/utils.module.scss";
import styles from "./styles.module.scss";
import Button from "./Button";

function BlogPostPage() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <DefaultLayout>
      <div
        className={`${styles.blogPostPage} ${utils.container} ${utils.d_grid}`}
        style={{ "--gap": "32px" }}
      >
        {/* bread crumb */}
        <div
          className={`${utils.d_flex} ${styles.blogPostPage__breadcrum}`}
          style={{ "--gap": "16px" }}
        >
          <a href="/">Home</a>
          <a
            href="/blog"
            className={styles.blogPostPage__breadcrum_current}
            disabled
          >
            Blog
          </a>
        </div>

        <div className={utils.d_grid} style={{ "--gap": "16px" }}>
          <h1 className={styles.blogPostPage__main_title}>
            The Surprising Way to Solve Your Customer Experience Problem:
            Customer Insight
          </h1>

          <h3 className={styles.blogPostPage__sub_title}>
            Consumer insight is data that a company collects about its customer
            base to learn more about what they need and how they feel about the
            brand.
          </h3>

          <a className={styles.blogPostPage__date} href="#date">
            Tech News - Nov 17, 2022
          </a>
        </div>

        <img src={image} alt="blog post thumbnail" />

        <div className={utils.d_grid} style={{ "--gap": "32px" }}>
          <p>Hi Scryber!,</p>

          <p>
            After reading the intriguing title, you were hoping to jump right
            in. - Oops! Perdón. Kindly allow me to make you smile with a short
            story before we get serious with the topic 🙃. If you want to get
            right to the point? <a href="#go-on">Get on!</a>
          </p>
          <p>
            This is Scrybe’s first blog, and I thought you might be wondering,
            “Why this topic as a first blog?” (I know you didn’t). Well, here’s
            why, when creating a slogan for Scrybe: All of the slogans I
            shortlisted had the word "insight," and my team teased me about it.
            I did it because I wanted to emphasize how thoroughly detailed the
            outcomes Scrybe will produce for your team will be. Other words
            could describe that, but none were as effective as IN-SIGHT. Like
            John Wooden said, “It&apos;s the little details that are vital."
            "Little things make big things happen.” I hope you understand my
            thought process. Hence, the purpose of this essay is to help you
            fully comprehend the importance of the customer and to once again
            rub the word "insight" in the team&apos;s faces. I do hope that my
            story made you smile and that you now agree with me. Let&apos;s now
            discuss customer insight!
          </p>

          <h2>
            Consumer insights are among the business terms that are frequently
            used, along with "market research" and "customer experience."
          </h2>
          <p>
            And for practical reasons, they include information you can use to
            monitor and enhance customer happiness over the long term. The key
            to securing a company&apos;s future is, above all else, enhancing
            client happiness over time which consequently.
            <a href="#research">According to Microsoft research</a>, companies
            that analyze customer behavior and use it to gain consumer insights
            outperform their competitors by 85% in terms of sales growth.
            <br />
            Customer experience management (CXM) is the proactive process of
            tracking customer behavior to enhance subsequent interactions.
            Customer insight is valuable information that a great CXM can
            extract. They assist you in setting priorities for your business
            objectives since they contain information you can use to manage and
            raise client satisfaction.
            <br />
            We&apos;ll first define customer insights and define what they are
            not, for clarity&apos;s sake, before moving on to some excellent
            starting points that will help you start identifying and utilizing
            your customer insights.
          </p>

          <h2>You will find out;</h2>
          <ul>
            <li>
              <a href="#insights">What are consumer insights?</a>
            </li>
            <li>
              <a href="#crucial">
                Why is it crucial to have consumer insights?
              </a>
            </li>
            <li>
              <a href="#research">Consumer Insights vs. Market Research</a>
            </li>
            <li>
              <a href="#how-to-gather">Consumer Insights: How to Gather Them</a>
            </li>
            <li>
              <a href="#use-consumer-insights">How to Use Consumer Insights</a>
            </li>
          </ul>

          <h2 id="customer-insights">What are consumer insights?</h2>
          <p>
            Consumer insight is data that a company collects about its customer
            base to learn more about what they need and how they feel about the
            brand. Businesses can enhance their goods and services by studying
            what existing and future customers think and feel about a brand.
          </p>

          <h2 id="crucial">Why is it crucial to have consumer insights?</h2>

          <p>
            Customer experience is paramount, so consumer insights are crucial.
            Therefore, understanding the needs of your client base will
            inevitably lead to accurate customer insights. The data supports
            this by showing that by putting your insights into action, you can
            both gain new customers through customer advocacy and boost loyalty
            among your current clientele.
          </p>

          <p>
            According to a <a href="#brains">Bain & Co study</a>, companies that
            excel at CX grow 4-8% faster than their competitors. My guess? You
            want that!
          </p>

          <h2 id="research">Consumer Insights vs. Market Research.</h2>

          <img src={blogImage} alt="research result" />

          <h2>Consumer Insights are:</h2>

          <p>
            Consumer insights are ideas, viewpoints, and experiences that are
            expressed by individuals and evaluated by a company to better
            understand what their customers are thinking and feeling.
          </p>

          <h2>Market Research is:</h2>

          <div>
            <p>
              Market research is the process of gathering information about the
              market, typically in the form of direct questions. These details
              could include, but are not limited to:
            </p>
            <ul>
              <li>Size of a market that can be served</li>
              <li>Marketing encroachment</li>
              <li>Demand for a particular sector, product, or service</li>
              <li>Age-related, socioeconomic, and educational statistics</li>
              <li>Competitors</li>
              <li>gap or needs in the market</li>
            </ul>
            <p>
              General market research findings give a broad overview of a
              consumer demographic. Brands utilize this data for a variety of
              purposes, including deciding which markets to target and what
              products to create next.
            </p>
            <br />
            Why is it important?
            <br />
            To assist provide market data meaning, consumer insights are
            frequently used as a follow-up to market research initiatives. If
            the analysis has recommendations and a story, you have insights.
            Actionable insights will result in growth.
          </div>

          <p>
            General market research findings give a broad overview of a consumer
            demographic. Brands utilize this data for a variety of purposes,
            including deciding which markets to target and what products to
            create next.
            <br />
            Why is it important?
            <br />
            To assist provide market data meaning, consumer insights are
            frequently used as a follow-up to market research initiatives. If
            the analysis has recommendations and a story, you have insights.
            Actionable insights will result in growth.
          </p>

          <h2 id="how-to-gather">Consumer Insights: How to Gather Them.</h2>

          <div>
            <p>
              Raw data is the basis for all insights. When it comes to consumer
              insights, you are analyzing raw customer data rather than market
              trends or competitors. These open-ended data and often voice,
              text, or video-based are analyzed by more sophisticated software
              to find consumer insights. These data are gathered through;
            </p>
            <ul>
              <li>Interviews, chats, customer support recaps</li>
              <li>Monitoring website analytics</li>
              <li>Survey campaigns</li>
              <li>Social media input</li>
            </ul>
          </div>

          <h2 id="use-consumer-insights">How to Use Consumer Insights.</h2>

          <p>
            You will need some strong AI tools if you want to make your insight
            game the best it can be.
            <br />
            Scrybe is an intelligent technology that automatically transcribes
            and analyzes recorded customer assistance interactions to generate
            sentiment analysis data.
          </p>

          <p>
            The sentiment analysis of the uploaded audio file is included in
            every report we provide for you, along with accurate text
            transcription.
          </p>

          <p>The practical applications of these insights are;</p>

          <p>
            How to Use Consumer Insights.
            <br />
            You will need some strong AI tools if you want to make your insight
            game the best it can be.
            <br />
            Scrybe is an intelligent technology that automatically transcribes
            and analyzes recorded customer assistance interactions to generate
            sentiment analysis data.
            <br />
            The sentiment analysis of the uploaded audio file is included in
            every report we provide for you, along with accurate text
            transcription.
            <br />
            The practical applications of these insights are;
          </p>

          <h2>Informed Business Strategy.</h2>
          <ul>
            <li>Your well-earned insights guide your decisions.</li>
          </ul>

          <h2>Individualized Marketing.</h2>
          <ul>
            <li>
              Being aware of your customers is smart business practice. Future
              products, survey initiatives, and your overall customer experience
              strategy can be influenced by learning more about the many
              customer categories you serve, their purchasing patterns, and
              their sentiments toward your company.
            </li>
          </ul>

          <h2>Optimized Products and Services.</h2>

          <ul>
            <li>
              Enhancing your customer service is essential to achieving
              outstanding overall CX because it gives customers a positive
              impression of your business and a sense of care, which promotes
              long-term loyalty and authentic connections.
            </li>
          </ul>

          <h2>Reduced Churn.</h2>

          <ul>
            <li>
              Minimizing churn is extremely important, as it&apos;s much more
              economical to retain customers than to acquire new ones.
            </li>
          </ul>

          <h2>In conclusion;</h2>

          <p>
            The quality of your overall business plan depends on how precise
            your consumer insights are.
            <br />
            If precision is what you&apos;re after, especially when working with
            data of different types and degrees of complexity, look no further
            than Scrybe.
            <br />
            Accurate and detailed consumer insights can be generated by
            Scrybe&apos;s AI-Powered transcription and sentimental analysis and
            shown in a dashboard that is specifically designed for your company.
            Enter straight away to test it out for yourself!
            <br />
            We can&apos;t wait to see how Scrybe simplifies your work, in the
            hopes that you&apos;ll become one of our{" "}
            <a href="#scrybers">Scrybers</a>.
          </p>

          <small>
            Posted by: Munachimso Ike Marketing Lead, November 17, 2022
          </small>
        </div>

        <div
          className={`${utils.d_flex} ${utils.justify_content_space_between}`}
        >
          <div>
            <Button component="a" href="#prev">
              <span className={utils.d_flex} style={{ "--gap": "8px" }}>
                <img src={arrowLeft} alt="previous blog post icon" />

                <span>Prev</span>
              </span>
            </Button>
          </div>

          <div>
            <Button component="a" href="#next">
              <span className={utils.d_flex} style={{ "--gap": "8px" }}>
                <span>Next</span>

                <img src={arrowRight} alt="previous blog post icon" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default BlogPostPage;
