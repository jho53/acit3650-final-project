import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, ActivityIndicator, Alert, Text, View, TouchableHighlight, FlatList, Modal, BackHandler, TextInput } from 'react-native'
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import DialogInput from 'react-native-dialog-input';
import ActionButton from "react-native-action-button";
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
      isLoading: null,
      currentUser: null,
      userName: "",
      selectedSchool: "",
      user_data: null,
      new_course_name: "",
      loading: true,
      modalVisible: true
    }
  }

  addCourse() {
    this.setState({
      isLoading: true,
    });
    var new_data = this.state.user_data;
    new_data[this.state.new_course_name] = {};
    console.log(new_data);
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('user_data').doc("123");
    updateRef.set(new_data).then((docRef) => {
      this.setState({
        new_course_name: "",
        isLoading: false,
      });
      this.props.navigation.navigate('LoggedInScreen');
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false,
        });
      });
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
      this.setState({ user_data: doc.data(), loading: false });
    } else {
      return 'error'
    }
  }

  onBackPress = () => {
    return true
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    /*this.load(currentUser.uid);*/
    this.load('123');

    // Disable Back Button
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.onBackPress
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
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
          <ActivityIndicator size="large" style={{ color: "white" }} />
        </ImageBackground>
      )
    } else {
      return (
        <ImageBackground style={styles.globalContainer} source={require("../../assets/main-background.jpg")}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerFont}>Dashboard</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontFamily: "sans-serif-light", color: "white", fontSize: 14.5, top: 14 }}>
                Welcome {currentUser && currentUser.email}! {"   "}
              </Text>
              <AntDesign name="logout" size={16} color={"white"} style={{ top: 14 }}
                onPress={() => {
                  Alert.alert("Confirm",
                    "Are you sure you want to log out?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => null,
                      },
                      {
                        text: "Yes",
                        onPress: () => this.handleLogout()
                      }
                    ])
                }} />
            </View>
          </View>
          <View style={styles.courseContainer}>
            <FlatList
              data={course_list}
              extraData={course_list}
              renderItem={({ item }) => (
                <View style={styles.courseTab}>
                  <Text style={styles.courseName}>{item} ({this.state.user_data[item]['term']}) </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="md-stats" size={36} color={"lightgreen"} style={{ paddingHorizontal: 5 }}
                      onPress={() => this.props.navigation.navigate("UserData", {
                        someId: 100,
                        course_data: this.state.user_data[item],
                        course_name: item,
                      })}
                    />
                    <MaterialIcons
                      name="edit"
                      size={34}
                      color={"lightblue"}
                      style={{ paddingHorizontal: 5 }}
                      onPress={() =>
                        this.props.navigation.navigate("EditData", {
                          someId: 100,
                          course_data: this.state.user_data[item],
                          course_name: item,
                          user_data: this.state.user_data,
                          user_uid: this.state.currentUser.uid,
                        })}
                    />
                    <MaterialCommunityIcons
                      name="delete-empty"
                      size={30}
                      color={"rgb(255,150,150)"}
                    />
                  </View>
                </View>
              )}
            />
            <ActionButton buttonColor={"lightgreen"}>
              <ActionButton.Item buttonColor='#9b59b6' title="Add New Course"
                onPress={() => this.setState({ modalVisible: true })}>
                <MaterialIcons name="class" size={24} />
              </ActionButton.Item>
            </ActionButton>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
              >
                <View style={{ width: "100%" }}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Course</Text>
                    <TextInput
                      style={styles.courseTextInput}
                      placeholder="Enter New Course Name"
                      value={this.state.new_course_name}
                      onChangeText={this.enter_course_name}
                    />
                    <TextInput
                      style={styles.courseTextInput}
                      placeholder="Enter Semester Year"
                    // value={this.state.new_course_name}
                    // onChangeText={this.enter_course_name}
                    />
                    <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-evenly", marginTop: 10 }}>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                          this.setState({ modalVisible: false })
                        }}
                      >
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                          this.setState({ modalVisible: false })
                        }}
                      >
                        <Text style={styles.textStyle}>Submit</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* <View style={styles.new_course}>
              <TextInput
                style={styles.new_course_input}
                placeholder="Enter New Course Name"
                value={this.state.new_course_name}
                onChangeText={this.enter_course_name}
              />
              <Button title="Add Course" onPress={() => this.addCourse()} />
            </View> */}
          </View>
          {/* <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Add Course"}
            message={"Message for DialogInput #1"}
            hintInput={"Course name"}
            submitInput={(inputText) => { this.sendInput(inputText) }}
            closeDialog={() => { this.setState({ isDialogVisible: false }) }}>
          </DialogInput> */}
        </ImageBackground>
      )
    }
  }
}
