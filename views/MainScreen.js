import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from '../db';

export default class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})