// In App.js in a new project

import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import HomeScreen from "../container/HomeScreen";

const Tab = createBottomTabNavigator();

function TabNavigator({ route, navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Status":
              iconName = "ios-refresh-circle";
              break;
            case "Calls":
              iconName = "ios-call";
              break;
            case "Camera":
              iconName = "ios-camera";
              break;
            case "Chats":
              iconName = "ios-chatbubbles";
              break;
            case "Settings":
              iconName = "ios-settings";
              break;
            default:
              iconName = "ios-chatbubbles";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Status" component={HomeScreen} />
      <Tab.Screen name="Calls" component={HomeScreen} />
      <Tab.Screen name="Camera" component={HomeScreen} />
      <Tab.Screen name="Chats" component={HomeScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
