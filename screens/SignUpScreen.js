import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  TextInput,
  List,
  RadioButton,
  Checkbox,
  Text,
  Divider,
  Button,
  Switch,
  Chip,
  Snackbar,
  useTheme
} from "react-native-paper";

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
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={styles.title}>👋  Bienvenue sur</Text>
      <Image source={require("../assets/logo/logoCouleur.png")} style={styles.logo} />
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
    </View>
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
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    marginBottom: 10,
    marginTop: 10,
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
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
});
