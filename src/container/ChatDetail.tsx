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
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

function ChatDetail({ route, navigation }) {
  navigation.setOptions({
    title: route.params.item.name,
  });
  return (
    <SafeAreaView>
      <Text>{route.name}</Text>
    </SafeAreaView>
  );
}

export default ChatDetail;
