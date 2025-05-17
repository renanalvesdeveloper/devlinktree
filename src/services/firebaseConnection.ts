import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsy1fJPEUHxYvP2gKE0OdUk2NrI6wmxdU",
  authDomain: "reactlinks-d7ed8.firebaseapp.com",
  projectId: "reactlinks-d7ed8",
  storageBucket: "reactlinks-d7ed8.firebasestorage.app",
  messagingSenderId: "625770896814",
  appId: "1:625770896814:web:01a9fce0c0f5eec708fc3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
