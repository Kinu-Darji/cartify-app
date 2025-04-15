// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBne6gPU5PGXT_rD4R87ihnZvEegCgY6l8",
  authDomain: "cartify-e4484.firebaseapp.com",
  projectId: "cartify-e4484",
  storageBucket: "cartify-e4484.appspot.com",
  messagingSenderId: "936768838626",
  appId: "1:936768838626:web:35193ca53012a9de70b7bb",
  measurementId: "G-PX6K8WCTBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
