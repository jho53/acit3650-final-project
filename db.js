import * as firebase from "firebase";
import "@firebase/firestore";

let Firebasedb = firebase.initializeApp({
  apiKey: "AIzaSyCyqqFtfwOYLgF_h4dqOtPj5ykWGTHqDVU",
  authDomain: "acit-react-native-finalproject.firebaseapp.com/",
  databaseURL: "https://acit-react-native-finalproject.firebaseio.com/",
  projectId: "acit-react-native-finalproject",
  storageBucket: "acit-react-native-finalproject.appspot.com",
  messagingSenderId: "350342567320"
});

export const db = Firebasedb.database();

