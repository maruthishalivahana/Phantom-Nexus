// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAleRWrf_REjx5SuKb96-qr5vU4UUkzT20",
    authDomain: "carrer-roadmap.firebaseapp.com",
    projectId: "carrer-roadmap",
    storageBucket: "carrer-roadmap.firebasestorage.app",
    messagingSenderId: "961263781717",
    appId: "1:961263781717:web:2b0aeff555539d0e7251dc",
    measurementId: "G-X5P07RB641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);