import React from "react";
import heroIcon from "../myAssets/hero__image.png";
import layoutIcon from "../myAssets/layout__three-hero.png";
import footIcon from "../myAssets/footer__init.png";

const index = () => {
  return (
    <div>
      <section>
        <div>
          <div>
            <div>
              <h1>Grow with us, Become a Partner</h1>
              <div>
                <p>
                  Once you become a partner, we recognize you officially as a
                  VIP User of Srcybe with added features and benefits.
                  Let&apos;s work together. Join our community of partners to
                  grow your business and solve the problems of others.
                </p>
              </div>
              <div>
                <input type="email" placeholder="Email address" />
                <input type="submit" value="Become a Partner" />
              </div>
            </div>
            <div>
              <img src={heroIcon} alt="Hero icon of the page" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div>
            <img src={layoutIcon} alt="Layout three section hero icon" />
          </div>
          <div>
            <h2>Why Join Our Partner Program</h2>
            <div>
              <div>
                <div />
                <div>
                  <h4>Service Offering </h4>
                  <div>
                    <p>
                      Increase the value of your customer service, get VIP
                      access to the most intelligent tool to help your business
                      grow
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div />
                <div>
                  <h4>VIP training & Onboarding </h4>
                  <div>
                    <p>
                      Full access to our learning library, for your entire team
                      to receive product training and our premium onboarding
                      packages
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div />
                <div>
                  <h4>Marketing Support</h4>
                  <p>
                    We will work together to create awareness of your
                    company/agency through opportunity, event
                    invitation/partnership, co-marketing initiatives, etc.
                  </p>
                </div>
              </div>
              <div>
                <div />
                <div>
                  <h4>Shared Revenue</h4>
                  <p>
                    A special reward for each referral, measured with an
                    industry-leading revenue share
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>
              For more inquiries and questions on our partner&apos;s program,
              send a mail to partner@scrybe.com
            </p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div>
            <div>
              <h3>Help more companies discover the power of Scrybe</h3>
            </div>
            <div>
              <button type="button">Join our Premium Partners Today</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div>
            <div>
              <h2>Partner with Scrybe</h2>
              <div>
                <p>
                  Drop details below and we get back to you as soon as possible
                </p>
              </div>
            </div>
            <div>
              <form>
                <div>
                  <div>
                    <div>
                      <label htmlFor="company__name">
                        <input
                          type="text"
                          id="company__name"
                          placeholder="Enter your company name"
                        />
                        Company Name
                      </label>
                    </div>
                    <div>
                      <label htmlFor="company__email">
                        <input
                          type="email"
                          id="company__email"
                          placeholder="Enter your company email"
                        />
                        Company Email
                      </label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="employees__number">
                        <input
                          type="number"
                          id="employees__number"
                          placeholder="E.g:  24"
                        />
                        Number of Employees
                      </label>
                    </div>
                    <div>
                      <label htmlFor="customer__number">
                        <input
                          type="number"
                          id="customer__number"
                          placeholder="E.g:  24"
                        />
                        Number of Customers
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="customer__address">
                      <input
                        type="text"
                        id="customer__address"
                        placeholder="Enter your company address"
                      />
                      Company Address
                    </label>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="city">
                        <input type="text" id="city" placeholder="City" />
                        City
                      </label>
                    </div>
                    <div>
                      <label htmlFor="state">
                        <input
                          type="text"
                          id="state"
                          placeholder="State/Province"
                        />
                        State/Province
                      </label>
                    </div>
                  </div>
                  <div>
                    <input type="submit" id="submit__btn" value="SUBMIT" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h5>Getting Started is Easy</h5>
                <div>
                  <p>
                    Wr are confident that you will get the best value from our
                    products
                  </p>
                </div>
                <div>
                  <button type="button">Try for Free</button>
                  <button type="submit">Schedule a Demo</button>
                </div>
              </div>
              <div>
                <img src={footIcon} alt="Icon before the footer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
