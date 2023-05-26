import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhFn4NaKoE0Q21p8QoYm-vlX5P98G_g5k",
  authDomain: "next-js-todo-app-74d4e.firebaseapp.com",
  projectId: "next-js-todo-app-74d4e",
  storageBucket: "next-js-todo-app-74d4e.appspot.com",
  messagingSenderId: "6853470894",
  appId: "1:6853470894:web:10edd5dac90fe482f9db3f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
