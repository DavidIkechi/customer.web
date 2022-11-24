import React from "react";
import { Link } from "react-router-dom";
import { BlogHero, insta01, insta02, insta03 } from "./assets";
import styles from "./style.module.scss";
import utils from "./assets/utils.module.scss";
import Card from "./BlogCard";
import { blogs } from "./assets/data";
import FadeInSection from "./FadeInSection";
import ImageSlider from "./ImageSlider";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function Blogs() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  const slides = [
    {
      url: insta01,
    },
    {
      url: insta02,
    },
    {
      url: insta03,
    },
  ];
  return (
    <div className={styles.blogs}>
      <NavBar />
      <div className={styles.blogs__hero}>
        <div className={styles.blogsHero__content}>
          <div>
            Get inspired with our awesome <span>blog</span> posts
          </div>
          <div>
            <img src={BlogHero} alt="blog-hero" />
          </div>
        </div>
      </div>
      {/* bread crumb */}
      <div
        className={`${utils.d_flex} ${styles.blogs__breadcrum}`}
        style={{ "--gap": "16px" }}
      >
        <a href="/">Home</a>
        <a
          href="/#blogs"
          className={styles.blogs__breadcrum_current}
          disabled={true}
        >
          Blog
        </a>
      </div>
      <div className={styles.blogs__grid_wrapper}>
        <div className={styles.blogs__search}>
          <input type="search" name="search" placeholder="Search Blogs" />
        </div>
        <div className={styles.blogs__grid}>
          {blogs.map((blog, i) => (
            <Link to={`/blog/${i}`} key={i + 1}>
              <FadeInSection key={i + 1}>
                <Card
                  key={i + 1}
                  imageUrl={blog.img}
                  title={blog.title}
                  date={blog.date}
                  body={blog.content}
                />
              </FadeInSection>
            </Link>
          ))}
        </div>
        <div className={styles.blogs__nav} id="#blog">
          <div>
            <a href="#blog"> ❮</a>
            <a href="#blog" className={styles.blogs__navSelected}>
              1
            </a>
            <a href="#blog">2</a>
            <a href="#blog">3</a>
            <a href="#blog">4</a>
            <a href="#blog">5</a>
            <a href="#blog"> ❯ </a>
          </div>
        </div>
      </div>
      <div className={styles.blogs__lastSection}>
        <div className={styles.blogs__lastSectionTitle}>
          <h3>Instagram Posts</h3>
        </div>
        <div className={styles.blogs__carousel}>
          <ImageSlider slides={slides} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;
