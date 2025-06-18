// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDGVmZwmJ4m-JicDa-bXEma9sp8bo9Uos",
  authDomain: "oillampnewsletterapp.firebaseapp.com",
  databaseURL: "https://oillampnewsletterapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oillampnewsletterapp",
  storageBucket: "oillampnewsletterapp.firebasestorage.app",
  messagingSenderId: "435713516292",
  appId: "1:435713516292:web:f0a18ac7f61d61bbc02651",
  measurementId: "G-5J5BPKEP7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);