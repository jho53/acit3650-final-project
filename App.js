import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'react-native-firebase'

import Loading from './components/Loading'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Main from './components/Main'


const RootStack = createStackNavigator(
  {
    Loading: {
      screen: Loading
    },
    SignUp: {
      screen: SignUp
    },
    Login: {
      screen: Login
    },
    Main: {
      screen: Main
    }
  },
    {
      initialRouteName: 'Loading',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
