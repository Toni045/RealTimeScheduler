// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDp3gST-cCHIH4E8OZOSy57SSjhBVkpCgE",
    authDomain: "realtimescheduler.firebaseapp.com",
    projectId: "realtimescheduler",
    storageBucket: "realtimescheduler.firebasestorage.app",
    messagingSenderId: "653919069917",
    appId: "1:653919069917:web:2a08d4cf1fe3ea7e7c9d34",
    measurementId: "G-3VTCK7E9WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
