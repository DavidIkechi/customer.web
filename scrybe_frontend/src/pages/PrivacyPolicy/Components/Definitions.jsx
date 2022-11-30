import React from "react";
import { Link } from "react-router-dom";

function Definitions() {
  return (
    <div className="sub-container">
      <h1>2. Definitions</h1>
      <p>
        <span>SERVICE</span> means the{" "}
        <Link to="/" className="link">
          heed.com.ng
        </Link>{" "}
        website operated by Heed.
      </p>
      <p>
        <span> PERSONAL DATA</span> means data about a living individual who can
        be identified from that data (or from those and other information either
        in our possession or likely to come into our possession).
      </p>
      <p>
        <span>USAGE DATA </span> is data collected automatically either
        generated by the use of Service or from Service infrastructure itself
        (for example, the duration of a page visit).
      </p>
      <p>
        <span>COOKIES</span> are small files stored on your device (computer or
        mobile device).
      </p>
      <p>
        <span>DATA SUBJECT</span> is any living individual who is the subject of
        Personal Data.
      </p>
      <p>
        <span>THE USER</span> is the individual using our Service. The User
        corresponds to the Data Subject, who is the subject of Personal Data.
      </p>
    </div>
  );
}

export default Definitions;
