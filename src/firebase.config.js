// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: // Your api firebase key,
    authDomain: //firebase domain,
    projectId: // your project id,
    storageBucket: // ,
    messagingSenderId:// example any random number if demo project,
    appId: // your app id 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
