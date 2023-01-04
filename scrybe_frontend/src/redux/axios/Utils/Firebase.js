import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmigSg-IYXaLyhFog-5fdCczuZh9Qdw-s",
  authDomain: "heed-6da01.firebaseapp.com",
  projectId: "heed-6da01",
  storageBucket: "heed-6da01.appspot.com",
  messagingSenderId: "382987420199",
  appId: "1:382987420199:web:a543a05cb19f9532b1c402",
  measurementId: "G-WN6D9LDKTT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { signInWithPopup, auth, app, provider };
