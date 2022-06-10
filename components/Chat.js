import React from "react";
//import the gifted chat
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";

// The application’s main Chat component that renders the chat UI export default
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "Your chat has been encrypted",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  //Send Message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={bubbleStyles}
      />
    );
  }

  render() {
    //get name
    let name = this.props.route.params.name;
    //get selected color
    let { bgColor } = this.props.route.params;
    //Set name to navbar
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}



const bubbleStyles = StyleSheet.create({
  left: {
    backgroundColor: "#4F94CD", borderColor: "black", borderWidth: 0.15,     shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  right: {
    backgroundColor: "#90EE90", borderColor: "black", borderWidth: 0.15,     shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
});

