import React from "react";
//import the gifted chat
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
const firebase = require("firebase");
require("firebase/firestore");

// The application’s main Chat component that renders the chat UI export default
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 1,
      user: {
        _id: "",
        name: "",
      },
      isConnected: false,
      image: null,
      location: null,
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBjcWNtsYJH0OMh-0yp7dTksz-UVxrmt24",
        authDomain: "meet-app-348714.firebaseapp.com",
        projectId: "meet-app-348714",
        storageBucket: "meet-app-348714.appspot.com",
        messagingSenderId: "109428924698",
        appId: "1:109428924698:web:60bd5a7f83bd3a11930ca3",
      });
    }

    //Stores and retrieves the chat messages users send
    this.referenceChatMessages = firebase.firestore().collection("messages");

    this.referenceMessagesUser = null;
  }

  componentDidMount() {
    this.referenceMessages = firebase.firestore().collection("messages");

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        user: {
          _id: user.uid,
          name: name,
        },
        messages: [],
      });

      this.unsubscribeChatUser = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: "Hello developer",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: "React Native",
    //         avatar: "https://placeimg.com/140/140/any",
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: "Your chat has been encrypted",
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ],
    // });

    this.referenceMessages = firebase.firestore().collection("messages");
    this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc");
  }

  //Send Message
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({ messages });
  };

  renderBubble(props) {
    return <Bubble {...props} wrapperStyle={bubbleStyles} />;
  }

  // push typed message to db
  addMessages() {
    const messages = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: messages._id,
      text: messages.text || "",
      uid: this.state.uid,
      createdAt: messages.createdAt,
      user: messages.user,
      image: messages.image || null,
      location: messages.location || null,
    });
  }

  componentWillUnmount() {
    // Stops listening for changes
    this.authUnsubscribe();
  }
  render() {
    //get name
    let name = this.props.route.params.name;
    //get selected color
    let { bgColor } = this.props.route.params;
    //Set name to navbar
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection("messages");
    const { messages, user } = this.state;
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
          user={user}
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
    backgroundColor: "#4F94CD",
    borderColor: "black",
    borderWidth: 0.15,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  right: {
    backgroundColor: "#90EE90",
    borderColor: "black",
    borderWidth: 0.15,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
