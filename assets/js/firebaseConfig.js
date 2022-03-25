import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue
} from "firebase/database";






const firebaseConfig = {
apiKey: "AIzaSyCx9qy25IMH3IQJ-tH6aLSY3z9AfQkDjo8",
authDomain: "my-stor-4f27b.firebaseapp.com",
databaseURL: "https://my-stor-4f27b-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "my-stor-4f27b",
storageBucket: "my-stor-4f27b.appspot.com",
messagingSenderId: "293670937750",
appId: "1:293670937750:web:f323871617e40f31c34eb7",
measurementId: "G-M2PE6PSDB0"
};
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const onAuthStateChanged = onAuthStateChanged();
