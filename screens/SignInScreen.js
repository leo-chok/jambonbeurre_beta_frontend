import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import {
  TextInput,
  Text,
  Button,
  useTheme,
} from "react-native-paper";

import { BACKEND_ADRESS } from "../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken, updateProfile } from "../reducers/user";
import Gif from "../components/Gif";

export default function SignInScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch la route SignIn (se connecter)
  const userdata = { email: email, password: password };

  // Bouton Connexion
  const handleSubmit = () => {
    fetch(BACKEND_ADRESS + "/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.result) {
          const userInfos = data.userInfos;

          // Enregistrement du token dans reducer
          dispatch(addToken(userInfos.authentification.token));

          // Enregistrement des autres infos dans reducer
          const dataReducer = {
            infos: userInfos.infos,
            description: userInfos.description,
            preferences: userInfos.preferences,
          };
          dispatch(updateProfile(dataReducer));
          navigation.navigate("TabNavigator", { screen: "Home" });
        } else {
          alert("Mauvais identifiants");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ width: 180, height: 180 }}>
        <Gif />
      </View>
      <Text style={styles.title}>Connecte-toi 👍</Text>
      <Text style={styles.fieldTitle}>Ton adresse e-mail</Text>
      <TextInput
        placeholder={"exemple@exemple.com"}
        value={email}
        onChangeText={(e) => setEmail(e)}
        style={styles.inputField}
        underlineColor="transparent"
      />
      <Text style={styles.fieldTitle}>Ton mot de passe</Text>
      <TextInput
        placeholder={"mot de passe"}
        value={password}
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
        style={styles.inputField}
        underlineColor="transparent"
      />
      <Button
        onPress={() => handleSubmit()}
        mode={"contained"}
        style={styles.badgeButton}
      >
        <Text style={styles.badgeButtonActive}>Connexion</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 0,
    marginTop: 20,
  },
  title: {
    marginTop: 150,
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    marginBottom: 20,
    marginTop: 20,
  },
  fieldTitle: {
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",
    marginBottom: 10,
    marginTop: 20,
  },
  textButton: {
    color: "#ec6e5b",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputField: {
    marginTop: 0,
    width: 350,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    underline: "none",
  },
  badgeButton: {
    width: "60%",
    margin: 30,
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
});
