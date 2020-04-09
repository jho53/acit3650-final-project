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

    render() {
        const { navigation } = this.props;
        const course_data = navigation.getParam("course_data");

        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
