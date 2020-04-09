import React, { Component } from 'react';
import { Text, TextInput, View, Button, ImageBackground, TouchableOpacity } from 'react-native'
import { Entypo } from "@expo/vector-icons";

import * as firebase from 'firebase';
import styles from "../../stylesheet/styles"

export default class LoginScreen extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    }
  }

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("aaa@aaa.aaa", "aaaaaa")
      .then(() => this.props.navigation.navigate('LoggedInScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
  };

  componentDidMount() {
    this.handleLogin
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/main-background.jpg")}
        style={styles.globalContainer}
      >
        <Text style={styles.bigTitle}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email: email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#000"
          style={styles.textInput}
          onChangeText={password => this.setState({ password: password })}
          value={this.state.password}
        />
        {
          this.state.errorMessage &&
          <TouchableOpacity onPress={() => this.setState({ errorMessage: null })}>
            <View style={styles.errorMessage}>
              <Entypo name="circle-with-cross" size={16} color={"red"} />
              <Text style={{ color: 'red', fontSize: 14, fontWeight: "bold" }}>
                {"   "}{this.state.errorMessage}
              </Text>
            </View>
          </TouchableOpacity>
        }

        <TouchableOpacity style={{ marginTop: 60 }}
          onPress={this.handleLogin}>
          <View>
            <Text style={styles.textButton}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}
          style={{ marginTop: 8 }}>
          <View>
            <Text style={styles.textButton}>Don't have an account?</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}
