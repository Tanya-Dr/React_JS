import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDRBbCZKvSgEQxydRM_LJJe5-NGJs0R_NU",
  authDomain: "gb-messenger2008.firebaseapp.com",
  databaseURL: "https://gb-messenger2008-default-rtdb.firebaseio.com",
  projectId: "gb-messenger2008",
  storageBucket: "gb-messenger2008.appspot.com",
  messagingSenderId: "459298969222",
  appId: "1:459298969222:web:befeb142fe17bbfffd2307",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();
