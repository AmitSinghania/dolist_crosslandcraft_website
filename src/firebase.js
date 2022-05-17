//import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
//import "firebase/auth";
import "firebase/compat/auth";
//import { getAuth } from "firebase/auth";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBnVms-2nShd5kJgAsnRyzDA6s4YLEXg-Q",
  authDomain: "do-list-7f304.firebaseapp.com",
  projectId: "do-list-7f304",
  storageBucket: "do-list-7f304.appspot.com",
  messagingSenderId: "651690232525",
  appId: "1:651690232525:web:4714e7b3a3a89d77c17784",
});
const collection = firebaseApp.firestore();
const db = firebaseApp.firestore();
const projectStorage = firebaseApp.storage();
const projectFirestore = firebaseApp.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const auth = firebaseApp.auth();
export { db, projectStorage, projectFirestore, timestamp, collection };
