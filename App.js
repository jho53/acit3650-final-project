import React from 'react';
import MainNavigation from "./navigation/MainNavigation"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from "firebase";
import "@firebase/firestore";

import LandingScreen from './views/loginSignupViews/LandingScreen'
import SignUp from './views/loginSignupViews/SignUp'
import LoginScreen from './views/loginSignupViews/LoginScreen'
import LoggedInScreen from './views/loginSignupViews/LoggedInScreen'
import UserDataGraph from './views/UserDataViews/UserDataGraph'
import UserDataEdit from './views/UserDataViews/UserDataEdit'


firebase.initializeApp({
  apiKey: "AIzaSyCyqqFtfwOYLgF_h4dqOtPj5ykWGTHqDVU",
  authDomain: "acit-react-native-finalproject.firebaseapp.com/",
  databaseURL: "https://acit-react-native-finalproject.firebaseio.com/",
  projectId: "acit-react-native-finalproject",
  storageBucket: "acit-react-native-finalproject.appspot.com",
  messagingSenderId: "350342567320"
});

const screenNavigator = createStackNavigator(
    {
      //-------Login/Signup Screens-------
      LandingScreen: {
        screen: LandingScreen
      },
      SignUp: {
        screen: SignUp,
      },
      LoginScreen: {
        screen: LoginScreen
      },
      //-------Screens after login-------
      LoggedInScreen: {
        screen: LoggedInScreen
      },
      //-------User Data with Graphs-------
      UserData: {
        screen: UserDataGraph
      },
      EditData: {
        screen: UserDataEdit
      },

    },
    {
      initialRouteName: 'LandingScreen',
      defaultNavigationOptions: {
        headerShown: false,
      }
    }
);

const AppContainer =  createAppContainer(screenNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
