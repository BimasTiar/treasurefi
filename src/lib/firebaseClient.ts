import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfHpEMYNlwo8EiCp-A_Ok1XFpI_XG7ErI",
  authDomain: "treasurefi.firebaseapp.com",
  projectId: "treasurefi",
  storageBucket: "treasurefi.appspot.com",
  messagingSenderId: "72719522744",
  appId: "1:72719522744:web:bc299388154c5dda788d4d",
  measurementId: "G-F672WWSBLN"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);