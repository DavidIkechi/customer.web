import React from "react";
import Banner from "./Banner";
import "../Style/notHiring.scss";

function NotHiring() {
  return (
    <div>
      <Banner />
      <div className="not-hiring-container">
        <div className="not-hiring">
          <h1>We are currently not hiring!</h1>
          <p>
            There are currently no open positions, however you can join our
            newsletter to get updated on our company and future opportunities.{" "}
          </p>
        </div>
        <div className="subscribe">
          <form action="/" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Enter Email address" />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NotHiring;
