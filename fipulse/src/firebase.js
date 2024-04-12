import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
//import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbuf8N2fSHau0HkmY2Q_jJASjnQ-Epkas",
  authDomain: "fipulse-ac851.firebaseapp.com",
  projectId: "fipulse-ac851",
  storageBucket: "fipulse-ac851.appspot.com",
  messagingSenderId: "173128409252",
  appId: "1:173128409252:web:e19349ce2a8eca6d110631"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//firebase.auth();
//firebase.database();
//const auth = firebase.auth(); //const auth = firebase.auth(); ovo je isto funkcionirali za sada
//const database = getDatabase(app);

export {
  app,
  //auth,
  firebase

}
//export { app, auth, database };
