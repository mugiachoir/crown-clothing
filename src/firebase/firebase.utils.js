import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAM8nUEDR3oy_RVXzWRI7EnckSXuG7DDAo",
  authDomain: "crown-db-7b50c.firebaseapp.com",
  databaseURL: "https://crown-db-7b50c.firebaseio.com",
  projectId: "crown-db-7b50c",
  storageBucket: "crown-db-7b50c.appspot.com",
  messagingSenderId: "163078543721",
  appId: "1:163078543721:web:c920c65511af1e5d6485f8",
  measurementId: "G-L6X1WMRCM7",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
