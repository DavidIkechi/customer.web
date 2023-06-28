/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable func-names */
import React from "react";
// import { termsData } from "./data";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

function TermsAndCondition() {
  return (
    <section className={styles.overallSection}>
      <div className={styles.theDiv}>
        <div>
          <div className={styles.termsContainer}>
            <div className={styles.headh2}>
              <h2>Terms of Services</h2>
              <hr />
            </div>
            <div className={styles.termsSecondSection}>
              <h3>Effective date: 2022-11-16</h3>
              <h3>
                Please read these terms and conditions carefully before using
                Our Service.
              </h3>
            </div>
            <section className={styles.termsContent}>
              <div>
                <h3>1. Introduction</h3>
                <p>Welcome to Heed (“Company”, “we”, “our”, “us”)!</p>
                <p>
                  These Terms of Service (“Terms”, “Terms of Service”) govern
                  your use of our website located at{" "}
                  <Link to="/" className={styles.link}>
                    www.heed.cx
                  </Link>{" "}
                  (together or individually “Service”) operated by Heed.
                </p>
                <p>
                  Our Privacy Policy also governs your use of our Service and
                  explains how we collect, safeguard and disclose information
                  that results from your use of our web pages. Your agreement
                  with us includes these Terms and our Privacy Policy
                  (“Agreements”). You acknowledge that you have read and
                  understood Agreements, and agree to be bound by them.
                </p>
                <p>
                  If you do not agree with (or cannot comply with) Agreements,
                  then you may not use the Service, but please let us know by
                  emailing at{" "}
                  <a href="mailto:support@heed.cx"> support@heed.cx </a>
                  so we can try to find a solution. These Terms apply to all
                  visitors, users and others who wish to access or use Service.
                </p>
              </div>

              <div>
                <h3>2. Communications</h3>
                <p>
                  By using our Service, you agree to subscribe to newsletters,
                  marketing or promotional materials and other information we
                  may send. However, you may opt out of receiving any, or all,
                  of these communications from us by following the unsubscribe
                  link or by emailing at{" "}
                  <a href="mailto:support@heed.cx"> support@heed.cx </a>
                </p>
              </div>
              <div>
                <h3>3. Content</h3>
                <p>
                  Our Service allows you to post, link, store, share and
                  otherwise make available certain information, text, graphics,
                  videos, or other material (“Content”). You are responsible for
                  Content that you post on or through Service, including its
                  legality, reliability, and appropriateness. By posting Content
                  on or through Service, You represent and warrant that:
                </p>
                <p>
                  (i) Content is yours (you own it) and/or you have the right to
                  use it and the right to grant us the rights and license as
                  provided in these Terms, and,
                </p>
                <p>
                  (ii) that the posting of your Content on or through Service
                  does not violate the privacy rights, publicity rights,
                  copyrights, contract rights or any other rights of any person
                  or entity. We reserve the right to terminate the account of
                  anyone found to be infringing on a copyright.
                </p>
                <p>
                  You retain any and all of your rights to any Content you
                  submit, post or display on or through Service and you are
                  responsible for protecting those rights. We take no
                  responsibility and assume no liability for Content you or any
                  third party posts on or through Service. However, by posting
                  Content using Service you grant us the right and license to
                  use, modify, publicly perform, publicly display, reproduce,
                  and distribute such Content on and through Service. You agree
                  that this license includes the right for us to make your
                  Content available to other users of Service, who may also use
                  your Content subject to these Terms.
                </p>
                <p>
                  Heed has the right but not the obligation to monitor and edit
                  all Content provided by users.
                </p>
                <p>
                  In addition, Content found on or through this Service are the
                  property of Heed or used with permission. You may not
                  distribute, modify, transmit, reuse, download, repost, copy,
                  or use said Content, whether in whole or in part, for
                  commercial purposes or for personal gain, without express
                  advance written permission from us.
                </p>
              </div>
              <div>
                <h3>4. Pricing Terms</h3>
                <p>
                  Subject to the Terms, the Services are provided to you without
                  charge up to certain usage limits, and usage in excess of
                  these limits may require purchase of additional resources and
                  the payment of fees. Please see Heed’s Pricing Terms at{" "}
                  <Link to="/pricing" className={styles.link}>
                    www.heed.cx/pricing
                  </Link>{" "}
                  for details regarding pricing for the Services.
                </p>
              </div>
              <div>
                <h3>5. Privacy Policies</h3>
                <p>
                  These Services are provided in accordance with our Privacy
                  Policy, which can be found at{" "}
                  <Link to="/privacy" className={styles.link}>
                    www.heed.cx/privacy
                  </Link>
                  . You agree to the use of your User Content and personal
                  information in accordance with these Terms and Heed’s Privacy
                  Policy.
                </p>
              </div>
              <div>
                <h3>6. Age Restriction</h3>
                <p>
                  Service is intended only for access and use by individuals at
                  least eighteen (18) years old. By accessing or using Service,
                  you warrant and represent that you are at least eighteen (18)
                  years of age and with the full authority, right, and capacity
                  to enter into this agreement and abide by all of the terms and
                  conditions of Terms. If you are not at least eighteen (18)
                  years old, you are prohibited from both the access and usage
                  of Service.
                </p>
              </div>
              <div>
                <h3>7. Accounts</h3>
                <p>
                  In the course of registering for or using the Services, you
                  may be required to provide Heed with certain information,
                  including your contact information, username and password
                  ("Credentials"). Heed handles such information with the utmost
                  attention, care and security. Nonetheless, you, not Heed,
                  shall be responsible for maintaining and protecting your
                  Credentials in connection with the Services. If your contact
                  information or other information relating to your account
                  changes, you must notify Heed promptly and keep such
                  information current. You are solely responsible for any
                  activity using your Credentials, whether or not you authorized
                  that activity. You should immediately notify Heed of any
                  unauthorized use of your Credentials or if your email or
                  password has been hacked or stolen. If you discover that
                  someone is using your Credentials without your consent, or you
                  discover any other breach of security, you agree to notify
                  Heed immediately.
                </p>
              </div>
              <div>
                <h3>8. Intellectual Property</h3>
                <p>
                  Service and its original content (excluding Content provided
                  by users), features and functionality are and will remain the
                  exclusive property of Heed and its licensors. Service is
                  protected by copyright, trademark, and other laws of and
                  foreign countries. Our trademarks may not be used in
                  connection with any product or service without the prior
                  written consent of Heed.
                </p>
              </div>
              <div>
                <h3>9. Copyright and Other Intellectual Property</h3>
                <p>
                  The content contained on this Platform is owned or licensed by
                  Heed and its third-party information providers and is
                  protected by applicable copyrights, trademarks, service marks,
                  and/or other intellectual property rights. Such content is
                  solely for your personal, non-commercial use. Accordingly, in
                  addition to specific restrictions outlined under clause 8.2,
                  you may not copy, distribute, modify, post, frame or deep link
                  this Platform, including any text, graphics, video, audio,
                  software code, user interface design or logos.
                </p>
                <p>
                  You may download material displayed on the Platform for your
                  personal use provided you also retain all copyright and other
                  proprietary notices contained on the materials. You may not
                  distribute, modify, transmit, reuse, repost, or use the
                  content on the Platform for public or commercial purposes,
                  including all text, images, audio, and video. Modification or
                  use of the materials for any other purpose violates Scrybe’s
                  intellectual property rights.
                </p>
                <p>
                  All trademarks, service marks, trade names, and logos
                  displayed on the Platform are proprietary to Heed and/or their
                  respective owners. Nothing contained on the Platform should be
                  construed as granting, by implication, estoppel, or otherwise,
                  any license or right to use any trademark displayed on the
                  Platform without the written permission of Scrybe or such
                  other third party that may own the trademark displayed on the
                  Platform. Your use of the trademarks displayed on the
                  Platform, except as provided herein, is strictly prohibited.
                </p>
                <p>
                  The use of the images displayed on the Platform by you, or
                  anyone else authorized by you, is prohibited. Any unauthorized
                  use of the images may violate copyright laws, trademark laws,
                  and the laws of privacy and publicity, and communications, as
                  well as other regulations and statutes. If you download any
                  information from the Platform, you agree that you will not
                  copy it or remove or obscure any copyright or other notices or
                  legends contained in any such information.
                </p>
              </div>
              <div>
                <h3>10. Third Party Software</h3>
                <p>
                  The Services may incorporate certain third party software
                  ("Third Party Software"), which is licensed subject to the
                  terms and conditions of the third party licensing such Third
                  Party Software. Nothing in these Terms limits your rights
                  under, or grants you rights that supersede, the terms and
                  conditions of any applicable license for such Third Party
                  Software.
                </p>
              </div>
              <div>
                <h3>11. Error Reporting and Feedback</h3>
                <p>
                  You may provide us either directly at info@Heed.com or via
                  third party sites and tools with information and feedback
                  concerning errors, suggestions for improvements, ideas,
                  problems, complaints, and other matters related to our Service
                  (“Feedback”). You acknowledge and agree that:
                </p>
                <p>
                  (i) you shall not retain, acquire or assert any intellectual
                  property right or other right, title or interest in or to the
                  Feedback;
                </p>
                <p>
                  (ii) Company may have development ideas similar to the
                  Feedback;
                </p>
                <p>
                  (iii) Feedback does not contain confidential information or
                  proprietary information from you or any third party; and
                </p>
                <p>
                  (iv) Company is not under any obligation of confidentiality
                  with respect to the Feedback. In the event the transfer of the
                  ownership to the Feedback is not possible due to applicable
                  mandatory laws, you grant Company and its affiliates an
                  exclusive, transferable, irrevocable, free-of-charge,
                  sub-licensable, unlimited and perpetual right to use
                  (including copy, modify, create derivative works, publish,
                  distribute and commercialize) Feedback in any manner and for
                  any purpose.
                </p>
              </div>
              <div>
                <h3>12. Disclaimer Of Warranty</h3>
                <p>
                  THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS
                  AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR
                  WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE
                  OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR
                  MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE
                  OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS
                  OBTAINED FROM US IS AT YOUR SOLE RISK.
                </p>
                <p>
                  NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES
                  ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
                  COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR
                  AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING,
                  NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS
                  OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES
                  OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE,
                  RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE
                  CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT
                  AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR
                  THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH
                  THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
                </p>
                <p>
                  COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
                  EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT
                  LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
                  NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE. THE
                  FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE
                  EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </p>
              </div>
              <div>
                <h3>13. Limitation Of Liability</h3>
                <p>
                  EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR
                  OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY
                  INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL
                  DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL
                  RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR
                  AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR
                  ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT,
                  NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN
                  CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION
                  ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM
                  THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE,
                  OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF
                  COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH
                  DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY
                  FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT
                  PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO
                  CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES.
                  SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
                  PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR
                  LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
                </p>
              </div>
              <div>
                <h3>14. Termination</h3>
                <p>
                  We may terminate or suspend your account and bar access to
                  Service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of Terms.
                  You may terminate these Terms at any time by canceling your
                  account on the Services. You will not receive any refunds if
                  you cancel your account. You agree that Heed, in its sole
                  discretion and for any or no reason, may terminate your
                  account or any part thereof. You agree that any termination of
                  your access to the Services may be without prior notice, and
                  you agree that Heed will not be liable to you or any third
                  party for such termination. You are solely responsible for
                  exporting your User Content from the Services prior to
                  termination of your account for any reason, provided that if
                  we terminate your account, we will endeavor to provide you a
                  reasonable opportunity to retrieve your User Content. Upon any
                  termination of the Services or your account these Terms will
                  also terminate, but all provisions of these Terms which, by
                  their nature, should survive termination, shall survive
                  termination, including, without limitation, ownership
                  provisions, warranty disclaimers, and limitations of
                  liability.
                </p>
              </div>
              <div>
                <h3>15. Governing Law</h3>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of Nigeria, which governing law applies to agreement
                  without regard to its conflict of law provisions. Our failure
                  to enforce any right or provision of these Terms will not be
                  considered a waiver of those rights. If any provision of these
                  Terms is held to be invalid or unenforceable by a court, the
                  remaining provisions of these Terms will remain in effect.
                  These Terms constitute the entire agreement between us
                  regarding our Service and supersede and replace any prior
                  agreements we might have had between us regarding Service.
                </p>
              </div>
              <div>
                <h3>16. Changes To Service</h3>
                <p>
                  We reserve the right to withdraw or amend our Service, and any
                  service or material we provide via Service, in our sole
                  discretion without notice. We will not be liable if for any
                  reason all or any part of Service is unavailable at any time
                  or for any period. From time to time, we may restrict access
                  to some parts of Service, or the entire Service, to users,
                  including registered users.
                </p>
              </div>
              <div>
                <h3>17. Amendments To Terms</h3>
                <p>
                  We may amend Terms at any time by posting the amended terms on
                  this site. It is your responsibility to review these Terms
                  periodically. Your continued use of the Platform following the
                  posting of revised Terms means that you accept and agree to
                  the changes. You are expected to check this page frequently so
                  you are aware of any changes, as they are binding on you.
                </p>
                <p>
                  By continuing to access or use our Service after any revisions
                  become effective, you agree to be bound by the revised terms.
                  If you do not agree to the new terms, you are no longer
                  authorized to use Service.
                </p>
              </div>
              <div>
                <h3>18. Miscellaneous</h3>
                <p>
                  You agree that all agreements, notices, disclosures and other
                  communications that we provide to you electronically satisfy
                  any legal requirement that such communications be in writing.
                  Assigning or sub-contracting any of your rights or obligations
                  under these Terms of Use to any third party is prohibited. We
                  reserve the right to transfer, assign or subcontract the
                  benefit of the whole or part of any rights or obligations
                  under these Terms of Use to any third party.
                </p>
              </div>
              <div>
                <h3>19. Acknowledgement</h3>
                <p>
                  BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU
                  ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND
                  AGREE TO BE BOUND BY THEM.
                </p>
              </div>
              <div>
                <h3>20. Contact Us</h3>
                <p>
                  Please send your feedback, comments, requests for technical
                  support by email:{" "}
                  <a href="mailto:support@heed.cx"> support@heed.cx</a>.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TermsAndCondition;
