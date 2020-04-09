import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image, Text, View, Button, FlatList, TouchableOpacity, TextInput } from 'react-native'
// import grabUserSignUpInfo from "../../api/userApi"
import * as firebase from 'firebase';
import "@firebase/firestore";
import { decode, encode } from 'base-64'

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
      user_data : null,
      new_course_name: "",
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
      this.setState({user_data: doc.data()});
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
  }

  enter_course_name = userInput => {
    this.setState({ new_course_name: userInput });
  };

  render() {
    const { currentUser } = this.state;
    var course_list = [];
    if (this.state.user_data != null){
      course_list = Object.keys(this.state.user_data);
    }

    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.handleLogout} />
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
                    <Button title={'Edit '+item} onPress={()=>
                        this.props.navigation.navigate("EditData", {
                            someId: 100,
                            course_data: this.state.user_data[item],
                            course_name: item,
                            user_data: this.state.user_data,
                            user_uid: this.state.currentUser.uid,
                        })}/>
                    <Text style={styles.course_name}>{item}</Text>
                    <Text style={styles.course_name}>{this.state.user_data[item]['term']}</Text>
                </TouchableOpacity>
            )}
        />
        <View>
          <TextInput
              style={styles.new_course_input}
              placeholder="Enter New Course Name"
              value = {this.state.new_course_name}
              onChangeText={this.enter_course_name}
          />
          <Button title="Add Course" onPress={() => this.addCourse()} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: 30
  },
  course_name:{
    fontSize: 30,
  },
  new_course_input:{
    height: 30,
    fontSize: 18,
  }
});
