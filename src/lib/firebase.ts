// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZaCvqHk3jRoT3bjf4I9dlaivY2rX_s1g",
  authDomain: "cifosig.firebaseapp.com",
  projectId: "cifosig",
  storageBucket: "cifosig.firebasestorage.app",
  messagingSenderId: "1095956434719",
  appId: "1:1095956434719:web:d5c5f5bb6d2e53872e2a2a",
  measurementId: "G-WBTZC28S5V"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

export {db};
 
