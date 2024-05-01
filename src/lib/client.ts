import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8pBm1Wcv0PrRgJhf1HdyEiJToUx9ysbc",
  authDomain: "bolus-stock-assistant.firebaseapp.com",
  projectId: "bolus-stock-assistant",
  storageBucket: "bolus-stock-assistant.appspot.com",
  messagingSenderId: "552903335967",
  appId: "1:552903335967:web:b0ade8bad0b8c52b5eb52a",
  measurementId: "G-MQQ88H5H58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const clientAuth = getAuth(app);