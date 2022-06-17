import React from "react";


import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard, Platform
} from "react-native";

// Importing the default background image from the folder
import BackgroundImage from "../img/Background_Image.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.colors.blue,
    };
  }

  // update selected background color
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    amber: "#FFBF00",
    paradisePink: "#E83F6F",
    starCommandBlue: "#2274A5",
    illuminatingEmerald: "#32936F",
    white: "#FFFFFF",
  };

  render() {
    const name = this.state.name;
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <View style={styles.container}>

        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>cOsMiC's Chat App</Text>
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Enter your name..."
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>
                {" "}
                Choose your background color!{" "}
              </Text>
            </View>

            {/* All the colors to change the background are here! */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.amber)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.paradisePink)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.starCommandBlue)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.illuminatingEmerald)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color5}
                onPress={() => this.changeBgColor(this.colors.white)}
              ></TouchableOpacity>
            </View>

            {/*This will allow the user to click on a button and be redirected to the chat page */}
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View></View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

// Creating the app's stylesheet, fixing sizes, centering items, changing colors
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 1,
    flex: 1,
    justifyContent: "space-around"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "50%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  box1: {
    backgroundColor: "white",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8,
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",

  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.9,
    
  },

  colorBox: {
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",
  },

  chooseColor: {
    textAlign:'center',
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },

  colorArray: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  color1: {
    backgroundColor: "#FFBF00",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  color2: {
    backgroundColor: "#E83F6F",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  color3: {
    backgroundColor: "#2274A5",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  color4: {
    backgroundColor: "#32936F",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  color5: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderWidth: 0.1,
    borderRadius: 25,
    borderStyle: 'groove',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#1D6085",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
