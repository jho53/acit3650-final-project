import React, { Component } from 'react';
import { Text, View, StyleSheet} from "react-native";
import * as firebase from 'firebase';
import "@firebase/firestore";
import { decode, encode } from 'base-64'

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } };

if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

export default class UserDataEdit extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.ref = firebase.firestore().collection('user_data');
        this.state = {
            currentUser: null,
            userName: "",
            selectedSchool: "",
            user_data : navigation.getParam("user_data"),
            course_data: navigation.getParam("course_data"),
            course_name: navigation.getParam("course_name"),
            user_uid: '123',
            /*user_uid: navigation.getParam("user_uid"),*/
        }
    }
    render() {
        console.log(this.state.user_uid);
        return (
            <View style={styles.container}>
                <Text>{this.state.course_name}</Text>
                <Text>{this.state.course_data['term']}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
});
