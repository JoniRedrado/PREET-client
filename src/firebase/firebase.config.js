// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKFUIy3p00kZmJls32RDSiOWdId6OOxBw",
  authDomain: "preet-bac1d.firebaseapp.com",
  projectId: "preet-bac1d",
  storageBucket: "preet-bac1d.appspot.com",
  messagingSenderId: "891572775442",
  appId: "1:891572775442:web:fad28dda7900a3e505c6cb",
  measurementId: "G-PPK006FHLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);