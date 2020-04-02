import React, { Component } from 'react';
import { Text, ActivityIndicator, ImageBackground } from 'react-native'

import styles from "../../stylesheet/styles"
import firebase from 'firebase';

export default class LandingScreen extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'LoggedInScreen' : 'SignUp')
    })
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/main-background.jpg")}
        style={styles.globalContainer}
      >
        <Text style={styles.bigTitle}>Loading</Text>
        <ActivityIndicator size="large" />
      </ImageBackground>
    )
  }
}