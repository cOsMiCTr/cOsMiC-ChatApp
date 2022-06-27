import React, { Component } from "react";
// import the screens we want to navigate
import Chat from "./components/Chat";
import Start from "./components/Start";

//import react gesture handler
import "react-native-gesture-handler";

//import the navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



//Bottom navigator
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createStackNavigator();


export default class HelloWorld extends Component {
  /* isPrimeNumber(number) takes a number and returns true if its a prime number */

  render() {
    return (
      <NavigationContainer>
        {/* Set the initial page to start */}
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

