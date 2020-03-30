import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './views/MainScreen'
import SignUp from './views/SignUp'
import LoginScreen from './views/LoginScreen'
import Main from './views/Main'

const RootStack = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen
    },
    SignUp: {
      screen: SignUp,
    },
    LoginScreen: {
      screen: LoginScreen
    },
    Main: {
      screen: Main
    }
  },
  {
    initialRouteName: 'MainScreen',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}