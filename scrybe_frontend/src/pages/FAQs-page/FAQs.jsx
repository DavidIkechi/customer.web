/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import styles from "./FAQs.module.scss";
import { FaqComponent } from "../../components/faqComponent";
import { Hero } from "../../assets";

function FAQs() {
  const [faqs, setFaqs] = useState([
    {
      question: "How can I register?",
      answer:
        "You can register on the Signup page of the web application Every user is entitled to limited free use of our application with just a quick registration. After entering the required data and accepting the Privacy Policy and Terms of Use, we automatically email you to confirm the registration. The account can be activated by clicking on the ‘Confirm registration’ link in the e-mail. After the registration, each user has a free but limited Starter package. If registering with a Facebook account, no confirmation is required.",
      open: false,
    },
    {
      question: "What are the limitations of the free package?",
      answer:
        "You Can only upload a Minute worth of audio files for transcription and sentimental analysis on this package",
      open: false,
    },
    {
      question: "What formats can I use for file upload?",
      answer:
        "For file upload, the supported extensions are: .wav, .mp3, .m4a, .ogg, .mp4, .webm, .mov, and .opus.",
      open: false,
    },
    {
      question: "What are the limitations of the uploaded materials?",
      answer: "Users can upload files with a maximum size of 2 GB.",
      open: false,
    },
    {
      question: "How can I have the best-quality of transcript and analysis?",
      answer:
        "The quality of the microphone, (mobile or laptop built-in microphone, headset, external microphone, or other devices) the distance between the speaker and the microphone, the volume of the speech and the level of background noises affect the estimated 95% punctuality of the transcript. The better the conditions while recording, the better transcript results can be reached. Before dictation, you can check whether your microphone is properly connected and what recording quality is expected with the device used for dictation.",
      open: false,
    },
    {
      question: "Who has access to my data?",
      answer:
        "Audio materials uploaded by the subscriber or recorded with a microphone in the Alrite application, as well as related text files, can only be accessed by the subscriber and (in case of business use) by users associated with the subscriber! The subscriber has the exclusive right to view, download and use the audio and text files for any other purpose. The data may only be accessed for service purposes by specialists authorized by our company, in compliance with strict security regulations. Our company does not use this data to improve the deep learning-based speech recognition and word processing algorithms of the Alrite system, or to develop Alrite for functional purposes - other procedures and publicly available, processable data files are available to for this purpose.Data from our business subscribers using the system's on-premise infrastructure is stored in their internal server environment, ensuring maximum protection of business data.",
      open: false,
    },
    // {
    //   question: "Can I see my files while they are being transcribed?",
    //   answer:
    //     "Yes. With complex terminology, Scrybe's advanced technology integrates linguistic, auditory.",
    //   open: false,
    // },
    // {
    //   question: "Is there a minimum duration for files?",
    //   answer:
    //     "events to identify the topic of the file and use a database of the most-used words in a manner that results in higher accuracy.",
    //   open: false,
    // },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className={styles.faq__wrapper}>
      <div className={styles.faq__hero}>
        <div className={styles.faqHero__content}>
          <div>
            Get the answers you're looking for on <span>Scrybe</span>
          </div>
          <div>
            <img src={Hero} alt="" />
          </div>
        </div>
      </div>

      <div className={styles.faq__section}>
        <div className={styles.faq__title}>
          <h2>Frequently Asked Questions</h2>
          <p>Need Some Answers?</p>
        </div>
        <div className={styles.faq__accordion}>
          <div className="faqs">
            {faqs.map((faq, index) => (
              <FaqComponent
                faq={faq}
                index={index}
                key={faq.id}
                toggleFAQ={toggleFAQ}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
