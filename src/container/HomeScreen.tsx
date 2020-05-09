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

function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [searchData, setsearchData] = useState([]);
  const [isRefreshing, setisRefreshing] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleSearch = (text) => {
    const result = data.filter((item) =>
      Object.values(item).some((t) => t.includes(text))
    );
    setsearchData(result);
  };
  const handleRefresh = () => {
    setisRefreshing(true);
    fetch("https://hwasampleapi.firebaseio.com/chats.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .then(() => setisRefreshing(false))
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, padding: 12 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button onPress={() => console.log()} title="Edit" />
          <Ionicons name="ios-create" size={32} color={"dodgerblue"} />
        </View>
        <Text style={{ fontSize: 36, fontWeight: "bold" }}>{route.name}</Text>
        {/* Searchbar */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ddd",
            borderRadius: 12,
            marginTop: 12,
          }}
        >
          <Ionicons
            name="ios-search"
            size={32}
            color={"#ccc"}
            style={{ marginStart: 12 }}
          />
          <TextInput
            placeholder="Search"
            style={{ flex: 1, marginStart: 12 }}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh()}
            refreshing={isRefreshing}
          />
        }
        data={searchData.length === 0 ? data : searchData}
        ItemSeparatorComponent={() => (
          <View
            style={{ backgroundColor: "#ccc", height: 1, marginStart: 50 + 24 }}
          ></View>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 6,
            }}
          >
            <Button onPress={() => console.log()} title="Broadcast Lists" />
            <Button onPress={() => console.log()} title="New Group" />
          </View>
        )}
        keyExtractor={(v) => v.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatDetail", { item: item })}
            style={{ padding: 12, flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={{ uri: item.image, width: 50, height: 50 }}
              style={{ borderRadius: 50 }}
            />
            <View style={{ flex: 1, marginStart: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
                <Text style={{ color: "#999" }}>{item.date}</Text>
              </View>
              <Text numberOfLines={1} style={{ color: "#666" }}>
                {item.message}
              </Text>
            </View>
            <Ionicons
              name="ios-arrow-forward"
              size={24}
              color={"#ccc"}
              style={{ marginStart: 12 }}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
export default HomeScreen;
