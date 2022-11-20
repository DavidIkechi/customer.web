/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { BlogHero, insta01, insta02, insta03 } from "../../assets";
import styles from "./Blogs.module.scss";
import Card from "../../components/BlogCard/Card";
import { blogs } from "../../assets/data";

function Blogs() {
  return (
    <div className={styles.blogs__wrapper}>
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
      <div className={styles.blogs__grid_wrapper}>
        <div className={styles.blogs__search}>
          <input type="search" name="search" placeholder="Search Blogs" />
        </div>
        <div className={styles.blogs__grid}>
          {blogs.map((blog, i) => (
            <Card
              key={i + 1}
              imageUrl={blog.img}
              title={blog.title}
              date={blog.date}
              body={blog.content}
            />
          ))}
        </div>
        <div className={styles.blogs__nav} id="#blog">
          <div>
            <a href="#blog"> &lt;</a>
            <a href="#blog" className={styles.blogs__navSelected}>
              1
            </a>
            <a href="#blog">2</a>
            <a href="#blog">3</a>
            <a href="#blog">4</a>
            <a href="#blog">5</a>
            <a href="#blog"> &gt; </a>
          </div>
        </div>
      </div>
      <div className={styles.blogs__lastSection}>
        <div className={styles.blogs__lastSectionTitle}>
          <h3>Instagram Posts</h3>
        </div>
        <div className={styles.blogs__carousel}>
          <div className={styles.blogs__carouselBtns}>
            <button type="button"> &lt; </button>
            <button type="button"> &gt; </button>
          </div>
          <div className={styles.blogs__images}>
            <img src={insta01} alt="insta" />
            <img src={insta02} alt="insta" />
            <img src={insta03} alt="insta" />
          </div>
        </div>
        <div className={styles.blogs__dots}>
          <button type="button" />
          <button type="button" />
          <button type="button" />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
