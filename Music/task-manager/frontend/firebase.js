// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl3xuUD1IJ1QrSmfg-WDwFRGsUTOkyXbA",
  authDomain: "task-management-e45c2.firebaseapp.com",
  projectId: "task-management-e45c2",
  storageBucket: "task-management-e45c2.firebasestorage.app",
  messagingSenderId: "117829209130",
  appId: "1:117829209130:web:e8f88df2a96046b0350753",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
