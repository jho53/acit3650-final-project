import Firebase from "firebase";
let config = {
  apiKey: "AIzaSyCyqqFtfwOYLgF_h4dqOtPj5ykWGTHqDVU",
  authDomain: "acit-react-native-finalproject.firebaseapp.com/",
  databaseURL: "https://acit-react-native-finalproject.firebaseio.com/",
  projectId: "acit-react-native-finalproject",
  storageBucket: "acit-react-native-finalproject.appspot.com",
  messagingSenderId: "350342567320"
};

let app = Firebase.initializeApp(config);
export const db = app.database();
