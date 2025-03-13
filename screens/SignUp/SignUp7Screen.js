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

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken, updateProfile } from "../../reducers/user";

export default function SignUp7Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const userReducer = useSelector((state) => state.user.value);
  const theme = useTheme();
  const [bio, setBio] = useState("");

  // Bouton suivant
  const handleSuivant = () => {
    const dataReducer = {
      description: {
        bio: bio,
      },
    };
    // On envoie les données modifiées au reducer User
    dispatch(updateProfile(dataReducer));

    // On enregistre sur la bdd
    const dataBDD = { token: token, bio: bio };
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("SignUp8");
      });
  };

    // Bouton ignorer
  const handleIgnore = () => {
    navigation.navigate("SignUp8");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Ton profil 🧑‍💻</Text>
        <Text style={styles.text}>
          Tu peux en dire un peu plus sur toi, {"\n"}cette présentation sera
          visible {"\n"}sur ton profil.
        </Text>
        <TextInput
          placeholder={"Bio"}
          multiline={true}
          value={bio}
          onChangeText={(e) => setBio(e)}
          style={styles.inputField}
          underlineColor="transparent"
        />
        <Button
          onPress={() => handleSuivant()}
          mode={"contained"}
          style={styles.badgeButton}
        >
          <Text style={styles.badgeButtonActive}>Suivant</Text>
        </Button>
        <Button
          onPress={() => handleIgnore()}
          mode={"outlined"}
          style={styles.badgeButton}
        >
          <Text style={styles.ignoreButtonActive}>Ignorer</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  badgeButton: {
    width: 250,
    marginHorizontal: "auto",
    marginTop: 16,

  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,

  },
  ignoreButtonActive: {
    color: "#fe5747",
    fontSize: 20,
  },
  inputField: {
    marginTop: 10,
    width: 300,
    height: 200,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 4,
  },
});
