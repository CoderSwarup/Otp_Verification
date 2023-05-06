// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnLKnYUCNYXT4nW58QubWRjEZvlIHwop8",
    authDomain: "phone-verification-188ab.firebaseapp.com",
    projectId: "phone-verification-188ab",
    storageBucket: "phone-verification-188ab.appspot.com",
    messagingSenderId: "882982969857",
    appId: "1:882982969857:web:568be1e76d412b18dbd600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)