// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1L3uTzfCsn1iUfdEv4P3aqYWyB-w6gNQ",
  authDomain: "prepwise-53847.firebaseapp.com",
  projectId: "prepwise-53847",
  storageBucket: "prepwise-53847.firebasestorage.app",
  messagingSenderId: "1053402041928",
  appId: "1:1053402041928:web:99e1befa5657747c80527d",
  measurementId: "G-18KPYPLDVH",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
