// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBVjFi4M5SZO4KsuF6l5H91a6wMqm28e0o",
  authDomain: "kt-info-tech.firebaseapp.com",
  projectId: "kt-info-tech", 
  storageBucket: "kt-info-tech.appspot.com",
  messagingSenderId: "778470146064",
  appId: "1:778470146064:web:ea781c6cfcb6f527770a95",
  measurementId: "G-6PJ3N6CY6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);