import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AgendaScreen from "./screens/AgendaScreen";
import AgendaInvitListScreen from "./screens/AgendaInvitListScreen";
import ChatConversationScreen from "./screens/ChatConversationScreen";
import ChatListScreen from "./screens/ChatListScreen";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileEditionScreen from "./screens/ProfileEditionScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CameraScreen from "./screens/CameraScreen";
import SignUp1Screen from "./screens/SignUp/SignUp1Screen";
import SignUp2Screen from "./screens/SignUp/SignUp2Screen";
import SignUp3Screen from "./screens/SignUp/SignUp3Screen";
import SignUp4Screen from "./screens/SignUp/SignUp4Screen";
import SignUp5Screen from "./screens/SignUp/SignUp5Screen";
import SignUp6Screen from "./screens/SignUp/SignUp6Screen";
import SignUp7Screen from "./screens/SignUp/SignUp7Screen";
import SignUp8Screen from "./screens/SignUp/SignUp8Screen";
import SignUp9Screen from "./screens/SignUp/SignUp9Screen";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes

import { PaperProvider } from "react-native-paper";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import reservations from "./reducers/reservations";
import discussions from "./reducers/discussions";

const store = configureStore({
  reducer: { user, reservations, discussions },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Agenda") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#FF6C47",
        tabBarInactiveTintColor: "#202020",
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {

const theme = {
  colors: {
    "primary": "rgb(223, 130, 25)",
    "onPrimary": "rgb(186, 131, 131)",
    "primaryContainer": "rgb(255, 215, 244)",
    "onPrimaryContainer": "rgb(56, 0, 55)",
    "secondary": "rgb(182, 35, 27)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(255, 218, 213)",
    "onSecondaryContainer": "rgb(65, 0, 1)",
    "tertiary": "rgb(0, 108, 72)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(141, 247, 194)",
    "onTertiaryContainer": "rgb(0, 33, 19)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(245, 236, 245)",
    "onBackground": "rgb(31, 26, 29)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(31, 26, 29)",
    "surfaceVariant": "rgb(234, 214, 186)",
    "onSurfaceVariant": "rgb(78, 68, 75)",
    "outline": "rgb(234, 175, 26)",
    "outlineVariant": "rgb(209, 194, 203)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(52, 47, 50)",
    "inverseOnSurface": "rgb(186, 64, 113)",
    "inversePrimary": "rgb(255, 171, 241)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(249, 242, 249)",
      "level2": "rgb(246, 236, 245)",
      "level3": "rgb(242, 231, 241)",
      "level4": "rgb(241, 229, 240)",
      "level5": "rgb(239, 225, 238)"
    },
    "surfaceDisabled": "rgba(31, 26, 29, 0.12)",
    "onSurfaceDisabled": "rgba(31, 26, 29, 0.38)",
    "backdrop": "rgba(55, 46, 52, 0.4)"
  }, // Copy it from the color codes scheme and then use it here
};


  return (
    <Provider store={store}>
      <PaperProvider  theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="ProfileEdition"
              component={ProfileEditionScreen}
            />
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen
              name="ChatConversation"
              component={ChatConversationScreen}
            />
            <Stack.Screen
              name="AgendaInvitListScreen"
              component={AgendaInvitListScreen}
            />
            <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="SignUp1" component={SignUp1Screen} />
            <Stack.Screen name="SignUp2" component={SignUp2Screen} />
            <Stack.Screen name="SignUp3" component={SignUp3Screen} />
            <Stack.Screen name="SignUp4" component={SignUp4Screen} />
            <Stack.Screen name="SignUp5" component={SignUp5Screen} />
            <Stack.Screen name="SignUp6" component={SignUp6Screen} />
            <Stack.Screen name="SignUp7" component={SignUp7Screen} />
            <Stack.Screen name="SignUp8" component={SignUp8Screen} />
            <Stack.Screen name="SignUp9" component={SignUp9Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    margin: 10,
  },

  tabBarIcon: {
    display: "flex",
    flexDirection: "row",
    width: 20,
    height: 20,
    marginBottom: -20,
  },
});
