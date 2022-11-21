import React from "react";

function DataCollected() {
  return (
    <div className="sub-container">
      <h1>4. Types of Data Collected</h1>
      <div>
        <h1>Personal Data</h1>
        <p>
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you (<span>“Personal Data”</span>). Personally identifiable
          information may include, but is not limited to:
        </p>
        <div>
          <ol>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, Country, State, Province, ZIP/Postal code, City</li>
            <li>Cookies and Usage Data</li>
          </ol>
        </div>
        <p>
          We may use your Personal Data to contact you with newsletters,
          marketing or promotional materials and other information that may be
          of interest to you. You may opt out of receiving any, or all, of these
          communications from us by following the unsubscribe link.
        </p>
      </div>
      <div>
        <h1>Usage Data</h1>
        <p>
          We may also collect information that your browser sends whenever you
          visit our Service or when you access Service by or through any device(
          <span>Usage Data”</span>).{" "}
        </p>
        <p>
          This Usage Data may include information such as your computer’s
          Internet Protocol address (e.g. IP address), browser type, browser
          version, the pages of our Service that you visit, the time and date of
          your visit, the time spent on those pages, unique device identifiers
          and other diagnostic data.
        </p>
        <p>
          When you access Service with a device, this Usage Data may include
          information such as the type of device you use, your device unique ID,
          the IP address of your device, your device operating system, the type
          of Internet browser you use, unique device identifiers and other
          diagnostic data.
        </p>
      </div>
      <div>
        <h1>Tracking Cookies Data</h1>
        <p>
          We use cookies and similar tracking technologies to track the activity
          on our Service and we hold certain information.
        </p>
        <p>
          Cookies are files with a small amount of data which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          website and stored on your device. Other tracking technologies are
          also used such as beacons, tags and scripts to collect and track
          information and to improve and analyze our Service.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our Service
        </p>
        <p>Examples of Cookies we use:</p>
        <ol>
          <li>
            {" "}
            Session Cookies: We use Session Cookies to operate our Service.
          </li>
          <li>
            {" "}
            Preference Cookies: We use Preference Cookies to remember your
            preferences and various settings.
          </li>
          <li>
            {" "}
            Security Cookies: We use Security Cookies for security purposes.
          </li>
          <li>
            {" "}
            Advertising Cookies: Advertising Cookies are used to serve you with
            advertisements that may be relevant to you and your interests.
          </li>
        </ol>
      </div>
      <div>
        <h1>Other Data</h1>
        <p>
          While using our Service, we may also collect the following
          information: sex, age, date of birth, place of birth, passport
          details, citizenship, registration at place of residence and actual
          address, telephone number (work, mobile), details of documents on
          education, qualification, professional training, employment
          agreements, information on bonuses and compensation, information on
          marital status, family members, social security (or other taxpayer
          identification) number, office location and other data.
        </p>
      </div>
    </div>
  );
}

export default DataCollected;
