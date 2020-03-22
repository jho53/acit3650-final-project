import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Button, Image, FlatList } from "react-native";
import { db } from "../db";

let itemsRef = db.ref("/items");

export default class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  static navigationOption = {
    title: "List"
  };

  componentDidMount() {
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      console.log(items);
      this.setState({ items: items });
    });
  }

  render() {
    // try {
    //   console.log(this.state.items);
    // } catch (e) {
    //   console.log(e);
    // }
    return (
      <View style={styles.container}>
        <Text>ListItem Screen</Text>
        <FlatList
          style={{ borderWidth: 2, borderColor: "red", width: "100%" }}
          // data={this.state.items}
          data={["asda","asdasd"]}
          renderItem={({ item }) => {
            <View style={{ borderWidth: 2, borderColor: "red" }}>
              <Text> {item.name} </Text>
              <Text>asdasd</Text>
            </View>
          }}
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
