// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHuYrCaFxM0qRr7-mhSflSWmdALjcGuAg",
  authDomain: "pinky-b65b4.firebaseapp.com",
  projectId: "pinky-b65b4",
  storageBucket: "pinky-b65b4.firebasestorage.app",
  messagingSenderId: "940134194200",
  appId: "1:940134194200:web:ecaa47d82316a9fd2fb76d",
  measurementId: "G-H4ZVSP4K50"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Admin credentials (hardcoded)
export const ADMIN_EMAIL = "admin@pinky.com";
export const ADMIN_PASSWORD = "Admin@12345";

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};