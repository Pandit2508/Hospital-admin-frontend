// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg0a0H6lhNSsql7scxZ4XxNzqdRtWKIyE",
  authDomain: "carepulse-52b2a.firebaseapp.com",
  projectId: "carepulse-52b2a",
  storageBucket: "carepulse-52b2a.firebasestorage.app",
  messagingSenderId: "869465487827",
  appId: "1:869465487827:web:b96821353ffc4cedd6d726",
  measurementId: "G-G8M6GJDTWY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
