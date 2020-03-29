import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import * as firebase from 'firebase';

export default class Main extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
    
        this.setState({ currentUser })
      }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
            <Text>
              Hi {currentUser && currentUser.email}!
            </Text>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }
      })