// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD8pBm1Wcv0PrRgJhf1HdyEiJToUx9ysbc",
  authDomain: "bolus-stock-assistant.firebaseapp.com",
  projectId: "bolus-stock-assistant",
  storageBucket: "bolus-stock-assistant.appspot.com",
  messagingSenderId: "552903335967",
  appId: "1:552903335967:web:b0ade8bad0b8c52b5eb52a",
  measurementId: "G-MQQ88H5H58"
};


/**
 * An object that represents this firebase application.
 */
export const app = initializeApp(firebaseConfig);


/**
 * An object that represents the storage for this firebase application.
 */
export const storage = getStorage(app)

/**
 * An object that represents the database for this firebase application. 
 * We use Cloud Firestore as opposed to Realtime Database because we want more
 * performant queries.
 */
export const usersCollection = collection(getFirestore(app), "/Users")

