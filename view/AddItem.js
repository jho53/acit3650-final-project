import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import { addItem } from "../service/MyServiceInterface";

export default class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  handleSubmit() {
    try {
      addItem(this.state.name);
      Alert.alert("Item saved successfully");
    } catch (e) {
      console.log(e);
    }
  }

  static navigationOption = {
    title: "Add"
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.title}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontSize: 25,
    textAlign: "center"
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginTop: 10,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    color: "black"
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center"
  },
  button: {
    height: 40,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
