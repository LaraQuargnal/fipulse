import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9Q9fmTz7saYuEeVzxQydhR6o8cp002Kw",
  authDomain: "fipulse.firebaseapp.com",
  projectId: "fipulse",
  storageBucket: "fipulse.appspot.com",
  messagingSenderId: "332641683387",
  appId: "1:332641683387:web:227d595a3cc6be71d8e69e",
};

const app = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { app, firebase, db };
