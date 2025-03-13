import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Text,
  Button,
  useTheme
} from "react-native-paper";

export default function SignUpScreen({ navigation }) {
  const theme = useTheme();

  // Renvoie vers la page de création de compte
  const handleSignUp = () => {
    navigation.navigate("SignUp1");
  };

  // Renvoie vers la page de connexion
  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={styles.title}>👋  Bienvenue sur</Text>
      <Image source={require("../assets/logo/logoCouleur.png")} style={styles.logo} />
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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
  },
  text: {
    fontSize: 20,
  },
  logo: {
    width: 350,
    height: 180,
    marginBottom: 12,
    marginTop: 0,
  },
  badgeButton: {
    width: "60%",
    margin: 8,
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
});
