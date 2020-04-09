import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, ActivityIndicator, Image, Text, View, Button, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import * as firebase from 'firebase';
import "@firebase/firestore";
import { decode, encode } from 'base-64'

import styles from "../../stylesheet/styles"

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } };

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }


export default class LoggedInScreen extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('user_data');
    this.state = {
      currentUser: null,
      userName: "",
      selectedSchool: "",
      user_data: null,
      new_course_name: "",
      loading: true
    }
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate("LandingScreen"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  async load(id) {
    const doc = await this.ref.doc(id).get();
    if (doc.exists) {
      this.setState({ user_data: doc.data() });
    } else {
      return 'error'
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    /*this.load(currentUser.uid);*/
    this.load('123');
    // let a = grabUserSignUpInfo()
    // console.log(a)
    this.setState({ loading: false })
  }

  enter_course_name = userInput => {
    this.setState({ new_course_name: userInput });
  };

  render() {
    const { currentUser } = this.state;
    var course_list = [];
    if (this.state.user_data != null) {
      course_list = Object.keys(this.state.user_data);
    }

    if (this.state.loading) {
      return (
        <ImageBackground
          source={require("../../assets/main-background.jpg")}
          style={styles.globalContainer}
        >
          <Text style={styles.bigTitle}>Loading</Text>
          <ActivityIndicator size="large" />
        </ImageBackground>
      )
    } else {
      return (
        <ImageBackground style={styles.globalContainer} source={require("../../assets/main-background.jpg")}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerFont}>Dashboard</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontFamily: "sans-serif-light", color: "white", fontSize: 14, top: 14 }}>
                Welcome {currentUser && currentUser.email}! {"  "}
              </Text>
              <AntDesign name="logout" size={16} color={"white"} style={{ top: 14 }} />
            </View>
          </View>
          <FlatList
            data={course_list}
            renderItem={({ item }) => (

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("UserData", {
                    someId: 100,
                    course_data: this.state.user_data[item],
                    course_name: item,
                  })
                }
              >
                <Button title={'Edit ' + item} onPress={() =>
                  this.props.navigation.navigate("EditData", {
                    someId: 100,
                    course_data: this.state.user_data[item],
                    course_name: item,
                    user_data: this.state.user_data,
                  })} />
                <Text style={styles.course_name}>{item}</Text>
                <Text style={styles.course_name}>{this.state.user_data[item]['term']}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.new_course}>
            <TextInput
              style={styles.new_course_input}
              placeholder="Enter New Course Name"
              onChangeText={this.enter_course_name}
            />
            <Button title="Add Course" onPress={() => this.addCourse()} />
          </View>
        </ImageBackground>
      )
    }
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     paddingTop: 30
//   },
//   course_name: {
//     fontSize: 30,
//   },
//   new_course_input: {
//     height: 30,
//     fontSize: 18,
//   }
// });
