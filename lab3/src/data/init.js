// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBz-WM4MZ3Z0GqE3MRHL2PDL3CciYfWbt0",
  authDomain: "lab34-szymonb.firebaseapp.com",
  projectId: "lab34-szymonb",
  storageBucket: "lab34-szymonb.appspot.com",
  messagingSenderId: "980862771780",
  appId: "1:980862771780:web:831979e6dcd01e0f4f5211"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
