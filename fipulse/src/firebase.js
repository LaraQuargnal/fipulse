import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfQPWZoSygyePmshM_J43DJUupOcgvuaw",
  authDomain: "fipulse-63362.firebaseapp.com",
  projectId: "fipulse-63362",
  storageBucket: "fipulse-63362.appspot.com",
  messagingSenderId: "127108540720",
  appId: "1:127108540720:web:6ad3ecae76bfa6d382c0f5",
};

const app = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storage = firebase.storage();

export { app, firebase, db, storage };
