import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import LandingScreen from '../views/loginSignupViews/LandingScreen'
import SignUp from '../views/loginSignupViews/SignUp'
import LoginScreen from '../views/loginSignupViews/LoginScreen'
import LoggedInScreen from '../views/loginSignupViews/LoggedInScreen'

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
        }
    },
    {
        initialRouteName: 'LandingScreen',
        defaultNavigationOptions: {
            headerShown: false,
        }
    }
)


export default createAppContainer(screenNavigator)