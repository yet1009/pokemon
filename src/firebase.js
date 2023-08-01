// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYfwVGmGDMnup5L6j_DEal09vX4OXJ5PY",
    authDomain: "react-poke-app-75dea.firebaseapp.com",
    projectId: "react-poke-app-75dea",
    storageBucket: "react-poke-app-75dea.appspot.com",
    messagingSenderId: "287074011382",
    appId: "1:287074011382:web:a8b97e1b9485e1812404d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app