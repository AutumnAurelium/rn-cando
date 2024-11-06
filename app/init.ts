import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDfSKYfm_ag6TiUj0bMrpku5TOpMDHxESM",
    authDomain: "cando-68065.firebaseapp.com",
    projectId: "cando-68065",
    storageBucket: "cando-68065.firebasestorage.app",
    messagingSenderId: "739196734453",
    appId: "1:739196734453:web:637c5a2a183da7ad126ebc",
    measurementId: "G-55PDK0BYN3"
};

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
