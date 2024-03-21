import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9Q9fmTz7saYuEeVzxQydhR6o8cp002Kw",
  authDomain: "fipulse.firebaseapp.com",
  projectId: "fipulse",
  storageBucket: "fipulse.appspot.com",
  messagingSenderId: "332641683387",
  appId: "1:332641683387:web:227d595a3cc6be71d8e69e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
