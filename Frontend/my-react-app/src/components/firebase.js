import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMuIpN2WNttzcaldMTWc00CDL0GssQzBA",
  authDomain: "thrifti-bbf7c.firebaseapp.com",
  projectId: "thrifti-bbf7c",
  storageBucket: "thrifti-bbf7c.appspot.com",
  messagingSenderId: "215940943363",
  appId: "1:215940943363:web:201a230173dba0c1da8836"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
