import * as firebase from "firebase";
import "@firebase/firestore";

export const Firebase = firebase.initializeApp({
  apiKey: "AIzaSyCyqqFtfwOYLgF_h4dqOtPj5ykWGTHqDVU",
  authDomain: "acit-react-native-finalproject.firebaseapp.com/",
  databaseURL: "https://acit-react-native-finalproject.firebaseio.com/",
  projectId: "acit-react-native-finalproject",
  storageBucket: "acit-react-native-finalproject.appspot.com",
  messagingSenderId: "350342567320"
})

const db = !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

const storage = firebase.app().storage('gs://acit-react-native-finalproject.appspot.com')

export default {
  db, storage
}
