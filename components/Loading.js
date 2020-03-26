import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
      }

    constructor() {
        super();
        this.state = {

        }
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