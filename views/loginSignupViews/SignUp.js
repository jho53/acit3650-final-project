import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, TouchableOpacity, Picker } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import styles from "../../stylesheet/styles"
import firebase from "firebase"
import storeUserSignupInfo from "../../api/userApi"

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      selectedSchool: '0',
      pickerTouched: false,
      errorMessage: null
    }
  }

  handleSignUp = () => {
    const { email, password, name, selectedSchool } = this.state

    if (this.state.name == "") {
      this.setState({ errorMessage: "Name cannot be empty" })
      return
    }
    if (this.state.selectedSchool == "0") {
      this.setState({ errorMessage: "Please select a valid school option" })
      return
    }

    firebase
      .auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        storeUserSignupInfo(name, selectedSchool)
        this.props.navigation.navigate('LandingScreen')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  componentDidMount() {
    this.setState({ email: "aaa@aaa.aaa", password: "aaaaaa", name: "aaaa", selectedSchool: "BCIT" })
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/main-background.jpg")}
        style={styles.globalContainer}
      >
        <Text style={styles.bigTitle}>Create Account</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#000"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {/* <TextInput
          placeholder="Name"
          autoCapitalize="sentences"
          placeholderTextColor="#000"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <View style={{
          height: 45,
          borderRadius: 10,
          width: '75%',
          borderColor: 'gray',
          borderWidth: 1.25,
          marginTop: 8,
          backgroundColor: "aliceblue",
          opacity: 0.75,
          justifyContent: "center"
        }}>
          <Picker
            selectedValue={this.state.selectedSchool}
            onValueChange={selectedSchool => this.setState({ selectedSchool })}
            style={{ fontFamily: "sans-serif-light", fontSize: 10, color: "grey" }}
            prompt="Options"
          >
            <Picker.Item label="Please choose a school..." value="0" />
            <Picker.Item label="BCIT" value="BCIT" />
            <Picker.Item label="UBC" value="UBC" />
            <Picker.Item label="SFU" value="SFU" />
            <Picker.Item label="KPU" value="KPU" />
            <Picker.Item label="Langara College" value="Langara College" />
          </Picker> 

        </View>*/}
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
          onPress={this.handleSignUp}>
          <View>
            <Text style={styles.textButton}>Sign Up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LoginScreen')}
          style={{ marginTop: 8 }}>
          <View>
            <Text style={styles.textButton}>Already have an account?</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}