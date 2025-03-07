import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
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
import discussions from './reducers/discussions';

const store = configureStore({
  reducer: { user, reservations , discussions },
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

          return <Ionicons name={iconName} size={28} color={color} />;
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

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [loaded, error] = useFonts({
    'OldStandard-Bold': require('./assets/fonts/OldStandardTT-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
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
            <Stack.Screen name="AgendaInvitListScreen" component={AgendaInvitListScreen} />
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
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    height: 60, 
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 24,
    marginHorizontal: 8,
    zIndex: 1,
  },


  tabBarIcon: {
    marginBottom: -24, // Ajustement fin pour bien centrer
  },
});
