import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SettingsScreen() {
  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
}

function ChatScreen({ route, navigation }: any) {
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetch("https://hwasampleapi.firebaseio.com/chats.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err))
      .finally(() => setRefreshing(false));
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12, borderColor: "#ccc", borderBottomWidth: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "dodgerblue" }}>Edit</Text>
          <Icon name={"ios-create"} size={30} color="dodgerblue" />
        </View>
        <Text style={{ fontSize: 36, fontWeight: "bold" }}>{route.name}</Text>
      </View>
      <FlatList
        style={{ flex: 1, backgroundColor: "#fff" }}
        data={data}
        keyExtractor={(v) => v.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View
            style={{
              padding: 12,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "dodgerblue" }}>Broadcast Lists</Text>
            <Text style={{ color: "dodgerblue" }}>New Group</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              marginStart: 74,
              backgroundColor: "#ddd",
              width: "100%",
            }}
          ></View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flexDirection: "row", padding: 12 }}
            onPress={() => navigation.navigate("ChatDetail")}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ flex: 1, marginStart: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  {item.name}
                </Text>
                <Text style={{ color: "#666" }}>{item.date}</Text>
              </View>

              <Text style={{ color: "#666", marginTop: 12 }} numberOfLines={1}>
                {item.message}
              </Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Icon
                style={{ marginStart: 12 }}
                name={"ios-arrow-forward"}
                size={24}
                color="#ddd"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            children={() => (
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
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: "dodgerblue",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen name="Status" component={ChatScreen} />
                <Tab.Screen name="Calls" component={ChatScreen} />
                <Tab.Screen name="Camera" component={ChatScreen} />
                <Tab.Screen name="Chats" component={ChatScreen} />
                <Tab.Screen name="Settings" component={ChatScreen} />
              </Tab.Navigator>
            )}
          />
          <Stack.Screen
            name="ChatDetail"
            component={SettingsScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
        {/*  */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const data2 = [
  {
    date: "02:22",
    image:
      "https://pbs.twimg.com/profile_images/991832743439994880/km5_AHDq_400x400.jpg",
    message: "Selam Devnot!",
    name: "Veli Bacik",
  },
  {
    date: "02:24",
    image:
      "https://pbs.twimg.com/profile_images/1122720030800711681/O4gJTgiG_400x400.jpg",
    message: "Selam Devtnot!",
    name: "Zafer Ayan",
  },
  {
    date: "02:26",
    image:
      "https://pbs.twimg.com/profile_images/1080233661876895745/K_zCxA2Q_400x400.jpg",
    message: "Selam Devtnot!",
    name: "Bora Kasmer",
  },
  {
    date: "02:28",
    image:
      "https://pbs.twimg.com/profile_images/1241977949076762624/P60G6QSa_400x400.jpg",
    message: "Selam Devtnot!",
    name: "Ugur Umutluoglu",
  },
  {
    date: "02:28",
    image: "https://picsum.photos/200/300",
    message:
      "Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. Ayrıca arama motorlarında 'lorem ipsum' anahtar sözcükleri ile arama yapıldığında henüz tasarım aşamasında olan çok sayıda site listelenir. Yıllar içinde, bazen kazara, bazen bilinçli olarak (örneğin mizah katılarak), çeşitli sürümleri geliştirilmiştir.",
    name: "Random Image",
  },
  {
    date: "03:00",
    image:
      "https://pbs.twimg.com/profile_images/1059531775460937729/lUk50piU_400x400.jpg",
    message:
      "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.",
    name: "HardwareAndro",
  },
];
