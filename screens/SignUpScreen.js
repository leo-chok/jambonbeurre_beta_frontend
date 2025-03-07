import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, Button, useTheme } from "react-native-paper";

export default function SignUpScreen({ navigation }) {
  const theme = useTheme();
  const handleSubmit = () => {
    navigation.navigate("TabNavigator", { screen: "Home" });
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp1");
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: theme.colors.primary }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>👋 Bienvenue sur</Text>
      <Image source={require("../assets/logo/logo.png")} style={styles.logo} />
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton} onPress={() => handleSubmit()}>
          Menu [DEV]
        </Text>
      </TouchableOpacity>
      <Button
        onPress={() => handleSignUp()}
        mode={"contained"}
        style={styles.badgeButton}
      >
        <Text style={styles.badgeButtonActive}>Créé ton compte</Text>
      </Button>
      <Text style={styles.text}>ou</Text>
      <Button
        onPress={() => handleSignIn()}
        mode={"contained"}
        style={styles.badgeButton}
      >
        <Text style={styles.badgeButtonActive}>Connecte-toi</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "league-spartan",
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  },
  logo: {
    width: 350,
    height: 180,
    marginBottom: 20,
    marginTop: 20,
  },
  textButton: {
    color: "#fe5747",
  },
  badgeButton: {
    width: "60%",
    margin: 10,
    backgroundColor: "#fe5747",
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
});
