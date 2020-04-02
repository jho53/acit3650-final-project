import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
// import grabUserSignUpInfo from "../../api/userApi"
import * as firebase from 'firebase';
import "@firebase/firestore";

export default class LoggedInScreen extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      userName: "",
      selectedSchool: ""
    }
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate("LandingScreen"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    // let a = grabUserSignUpInfo()
    // console.log(a)
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
            </Text>
        <Button title="Logout" onPress={this.handleLogout} />
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