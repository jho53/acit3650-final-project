import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import LandingScreen from '../views/loginSignupViews/LandingScreen'
import SignUp from '../views/loginSignupViews/SignUp'
import LoginScreen from '../views/loginSignupViews/LoginScreen'
import LoggedInScreen from '../views/loginSignupViews/LoggedInScreen'
import UserDataGraph from '../views/UserDataViews/UserDataGraph'
import UserDataEdit from '../views/UserDataViews/UserDataEdit'

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


export default createAppContainer(screenNavigator)
