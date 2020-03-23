import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./view/Home";
import AddItem from "./view/AddItem";
import ListItemScreen from "./view/ListItem";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Add: {
      screen: AddItem
    },
    List: {
      screen: ListItemScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
