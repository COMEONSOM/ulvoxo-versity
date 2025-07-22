// Import Firebase SDK functions
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBUYRpjY6F5sBAOuFhFFfApZzbNiIZZsUk",
  authDomain: "xfactorialdi.firebaseapp.com",
  projectId: "xfactorialdi",
  storageBucket: "xfactorialdi.firebasestorage.app",
  messagingSenderId: "644930268242",
  appId: "1:644930268242:web:a027e13c458947ad6fc38b",
  measurementId: "G-VPX5PBC11J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
