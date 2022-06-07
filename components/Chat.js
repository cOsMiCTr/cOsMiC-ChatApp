import React from "react";
import { View, Button, StyleSheet } from "react-native";

// The application’s main Chat component that renders the chat UI export default
export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    let { bgColor } = this.props.route.params;
    this.props.navigation.setOptions({ title: "Hello " + name });
    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      ></View>
    );
  }
}
