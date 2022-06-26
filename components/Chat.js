import React from "react";
//import the gifted chat
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import CustomActions from "./CustomActions";
import "firebase/firestore";
import firebase from "firebase";



// The application’s main Chat component that renders the chat UI export default
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: ""
      },
      image: null,
      location: null
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

 let name = this.props.route.params.name;
 //sets messages state with system message
 this.props.navigation.setOptions({ title: name });
 //check if the user is online or not
 NetInfo.fetch().then(connection => {
   if (connection.isConnected) {
     this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
       // user signed in control
       if (!user) {
         this.setState({
           loggedInText: "Please wait, You're being authenticated"
         })
         await firebase.auth().signInAnonymously()
       }
       //update user
       this.setState({
         isConnected: true,
         uid: user.uid,
         loggedInText: 'Hello there developer',
         messages: [],
         user: {
           _id: user.uid,
           name: name,
           avatar: "https://placeimg.com/140/140/any"
         }
       });
       //checks for updates in the collection
       this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
     });
     this.saveMessages();
   } else {
     this.getMessages();
     this.setState({
       isConnected: false
     })
   }
 });
  }



  //Send Message and save message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage();
      this.saveMessages();
    })
  }


  // send typed message to db
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || '',
      location: message.location || null,
    })
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {

      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
        image: data.image || null,
        location: data.location || null
      });
    });
    this.setState({
      messages: messages
    });
    this.saveMessages();
  }

  renderBubble(props) {
    return <Bubble {...props} wrapperStyle={bubbleStyles} />;
  }


  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
      );
    }
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }
  
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  componentWillUnMount() {
    //stop listening for changes
    this.unsunscribe();
    //stop listening to authentication
    this.authUnsubscribe();
  }


  render() {



    //get selected color
    let { bgColor } = this.props.route.params;

    this.referenceChatMessages = firebase.firestore().collection("messages");
    const { user } = this.state;
    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      >

<GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            username: this.state.username,
            avatar: this.state.user.avatar
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
