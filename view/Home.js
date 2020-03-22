import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Button, Image } from "react-native";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      url: ""
    };
  }

  static navigationOption = {
    title: "Home"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Go to AddItem"
          onPress={() =>
            this.props.navigation.navigate("Add", {
              someId: 100,
              someTitle: "Title"
            })
          }
        />
        <Button
          title="Go to ListItem"
          onPress={() =>
            this.props.navigation.navigate("List", {
              someId: 100,
              someTitle: "Title"
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
