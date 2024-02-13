import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCKFUIy3p00kZmJls32RDSiOWdId6OOxBw",
  authDomain: "preet-bac1d.firebaseapp.com",
  projectId: "preet-bac1d",
  storageBucket: "preet-bac1d.appspot.com",
  messagingSenderId: "891572775442",
  appId: "1:891572775442:web:fad28dda7900a3e505c6cb",
  measurementId: "G-PPK006FHLY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)