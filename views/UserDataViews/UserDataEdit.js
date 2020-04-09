import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, FlatList, Button, Alert} from "react-native";
import { Table, Row, Rows} from "react-native-table-component";
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
            new_term_input: navigation.getParam("course_data")['term'],
            isLoading: false,
            new_item_name: '',
            new_item_type: '',
            new_item_weight: '',
            new_item_percentage: '',


            /*user_uid: navigation.getParam("user_uid"),*/
        }
    }

    delete_row(item_name){
        Alert.alert(
            'Delete',
            'Are You sure you want to Delete ' + item_name + "?",
            [
                {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () => {
                        var temp_course_data = this.state.course_data;
                        delete temp_course_data['work'][item_name];
                        this.setState({course_data:temp_course_data});
                        this.setState({
                            isLoading: true,
                        });
                        var temp_user_data = this.state.user_data;
                        temp_course_data['term'] = this.state.new_term_input;
                        temp_user_data[this.state.course_name] = temp_course_data;

                        const updateRef = firebase.firestore().collection('user_data').doc("123");
                        updateRef.set(temp_user_data).then((docRef) => {
                            this.setState({
                                new_course_name: "",
                                user_data: temp_user_data,
                                isLoading: false,
                            });
                        })
                            .catch((error) => {
                                console.error("Error Deleting Item: ", error);
                                this.setState({
                                    isLoading: false,
                                });
                            });
                    }}
            ]
        );
    }
    addNewItem() {
        if (
            this.state.new_item_name !== '' && this.state.new_item_name !== null &&
            this.state.new_item_type !== '' && this.state.new_item_type !== null &&
            this.state.new_item_weight !== '' && this.state.new_item_weight !== null &&
            this.state.new_item_percentage !== '' && this.state.new_item_percentage !== null
        ){
            this.setState({
                isLoading: true,
            });
            var temp_course_data = this.state.course_data;
            temp_course_data['work'][this.state.new_item_name] = {
                type: this.state.new_item_type,
                weight: this.state.new_item_weight,
                percentage: this.state.new_item_percentage
            };
            var temp_user_data = this.state.user_data;
            temp_course_data['term'] = this.state.new_term_input;
            temp_user_data[this.state.course_name] = temp_course_data;

            const updateRef = firebase.firestore().collection('user_data').doc("123");
            updateRef.set(temp_user_data).then((docRef) => {
                this.setState({
                    new_item_name: "",
                    new_item_type: "",
                    new_item_weight: "",
                    new_item_percentage: "",
                    user_data: temp_user_data,
                    isLoading: false,
                });
            })
                .catch((error) => {
                    console.error("Error adding Item: ", error);
                    this.setState({
                        isLoading: false,
                    });
                });
        }else{
            Alert.alert("Invalid Input","Please Enter Valid values in all the fields")
        }
    }

    render() {
        const { navigation } = this.props;
        const user_data = navigation.getParam("user_data");
        var course_data = this.state.course_data;
        var course_name = navigation.getParam("course_name");
        const tableHead = ['Item Name', 'Work Type', 'Weight', 'Percentage'];
        var work_list = [];
        if (typeof course_data['work'] !== "undefined"){
            work_list = Object.keys(course_data['work']);
        }
        return (
            <View style={styles.container}>
                <Text>{course_name}</Text>
                <TextInput
                    value={this.state.new_term_input}
                    placeholder="Enter Term and Year"
                    onChangeText={(new_term_input) => {this.setState({new_term_input}) }}
                />
                <Table style={styles.table}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    <FlatList
                        data={work_list}
                        renderItem={({ item }) => (
                            <View>
                                <Row style={styles.row}
                                     data={[
                                         item,
                                         course_data['work'][item]['type'],
                                         course_data['work'][item]['weight'],
                                         course_data['work'][item]['percentage'],
                                     ]}
                                     textStyle={styles.text}
                                />
                                <Button title={"Delete "+item} onPress={() => this.delete_row(item)}/>
                            </View>
                        )}
                    />
                </Table>
                <View>
                    <TextInput
                        style={styles.new_course_input}
                        placeholder="Enter New Item Name"
                        value = {this.state.new_item_name}
                        onChangeText={(text) => {this.setState({new_item_name: text}) }}
                    />
                    <TextInput
                        style={styles.new_course_input}
                        placeholder="Enter New Item Type"
                        value = {this.state.new_item_type}
                        onChangeText={(text) => {this.setState({new_item_type: text}) }}
                    />
                    <TextInput
                        style={styles.new_course_input}
                        placeholder="Enter New Item Weight"
                        value = {this.state.new_item_weight}
                        keyboardType={'numeric'}
                        onChangeText={(new_item_weight) => {
                            if (/^\d*\.?\d*$/.test(new_item_weight) || new_item_weight === "") {
                                this.setState({new_item_weight})
                            }
                        }}
                    />
                    <TextInput
                        style={styles.new_course_input}
                        placeholder="Enter New Item Percentage"
                        value = {this.state.new_item_percentage}
                        keyboardType={'numeric'}
                        onChangeText={(new_item_percentage) => {
                            if (/^\d*\.?\d*$/.test(new_item_percentage)|| new_item_percentage === "") {
                                this.setState({new_item_percentage})
                            }
                        }}
                    />
                    <Button title="Add New Item" onPress={() => this.addNewItem()} />
                </View>
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
