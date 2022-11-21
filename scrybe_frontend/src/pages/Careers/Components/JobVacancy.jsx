import React from "react";
import Banner from "./Banner.jsx";
import "../Style/jobVacancy.scss";

function JobVacancy() {
  return (
    <div>
      <Banner />
      <div className="vacancy-container">
        <div className="summary">
          <div className="job-title">
            <h1>Front-End Developer</h1>
            <button>Apply</button>
          </div>
          <div className="location">
            <p>Location: Lagos</p>
            <p>Job type: Fulltime</p>
            <p>Compensation: ~300,000</p>
          </div>
          <div className="posted">
            <p>Posted 8 days ago</p>
          </div>
        </div>

        <div className="description">
          <p>
            We are looking for a qualified Front-end developer to join our IT
            team. You will be responsible for building the ‘client-side’ of our
            web applications. You should be able to translate our company and
            customer needs into functional and appealing interactive
            applications.
          </p>
          <p>
            If you’re interested in creating a user-friendly environment by
            writing code and moving forward in your career, then this job is for
            you.{" "}
          </p>
          <p>
            We expect you to be a tech-savvy professional, who is curious about
            new digital technologies and aspires to combine usability with
            visual design.
          </p>
          <p>
            Ultimately, you should be able to create a functional and attractive
            digital environment for our company, ensuring great user experience
          </p>
        </div>

        <div className="responsnsibilities list">
          <h1>Responsibilities</h1>
          <ul>
            <li>
              Use markup languages like HTML to create user-friendly web pages
            </li>
            <li>Maintain and improve website</li>
            <li>Maintain and improve website</li>
            <li>Collaborate with back-end developers and web designers </li>
          </ul>
        </div>

        <div className="skills list">
          <h1>Skills Required</h1>
          <ul>
            <li>Experience with JavaScript, CSS and jQuery</li>
            <li>Familiarity with browser testing and debugging</li>
            <li>
              In-depth understanding of the entire web development process{" "}
            </li>
            <li>Understanding of layout aesthetics </li>
            <li>Knowledge of SEO principles</li>
            <li>Familiarity with software like Adobe Suite.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobVacancy;
