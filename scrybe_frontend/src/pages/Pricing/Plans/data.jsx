import startUpIcon from "../assets/star.svg";
import enterpriseIcon from "../assets/corporate_fare.svg";

export const PricingData = [
  {
    id: 1,
    icon: startUpIcon,
    title: "Core Transcription",
    headDescription: "Starter",
    planKey: "starter",
    pricing: "0.02",
    duration: "per minute . Pre Recorded Transcription",
    features: [
      "Sentimental Analysis",
      "Keywords Capture",
      "Email & Chat Support",
    ],
  },

  {
    id: 2,
    icon: enterpriseIcon,
    title: "Voice Analysis",
    headDescription: "Enterprise",
    planKey: "enterprise",
    pricing: "0.03",
    duration: "per minute . Pre Recorded Transcription",
    features: [
      "Real Time Transcription",
      "Sentimental Analysis",
      "Speaker Diarylation",
      "Accent Capture",
      "Tone Detection",
      "PII Redaction",
    ],
  },
  {
    id: 3,
    icon: enterpriseIcon,
    title: "Voice Analysis",
    headDescription: "Enterprise Plus",
    planKey: "enterprise_plus",
    pricing: "0.035",
    duration: " per minute . Live Stream Transcription",
    features: [
      "Real Time Transcription",
      "Sentimental Analysis",
      "Speaker Diarylation",
      "Accent Capture",
      "Tone Detection",
      "PII Redaction",
    ],
  },
];
