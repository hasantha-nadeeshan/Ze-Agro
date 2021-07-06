import firebase from "firebase";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyAK_fynfOl7QOZJbM_Vf2A4ubs-JlGwg1k",
  authDomain: "path-finder-9370b.firebaseapp.com",
  databaseURL: "https://path-finder-9370b-default-rtdb.firebaseio.com",
  projectId: "path-finder-9370b",
  storageBucket: "path-finder-9370b.appspot.com",
  messagingSenderId: "698832012074",
  appId: "1:698832012074:web:356c5041c53ac95a28d453",
  measurementId: "G-LG3L1N0430"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();