import mod from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDfSKYfm_ag6TiUj0bMrpku5TOpMDHxESM",
    authDomain: "cando-68065.firebaseapp.com",
    projectId: "cando-68065",
    storageBucket: "cando-68065.firebasestorage.app",
    messagingSenderId: "739196734453",
    appId: "1:739196734453:web:637c5a2a183da7ad126ebc",
    measurementId: "G-55PDK0BYN3"
};

export const app = mod.initializeApp(firebaseConfig, {});