import { useEffect, useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  useTheme,
} from "react-native-paper";

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken, updateProfile } from "../../reducers/user";

export default function SignUp4Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const userReducer = useSelector((state) => state.user.value);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const theme = useTheme();
  console.log(userReducer);

  const handleSuivant = () => {
    // Enregistrement Reducer
    const dataReducer = { infos: { firstname: prenom, lastname: nom } };
    dispatch(updateProfile(dataReducer));

    // Enregistrement BDD
    const dataBDD = { token: token, firstname: prenom, lastname: nom };
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("SignUp5");
      });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Ton profil 🧑‍💻</Text>
        <Text style={styles.text}>C'est quoi ton petit nom ?</Text>
        <TextInput
          placeholder={"Prénom"}
          value={prenom}
          onChangeText={(e) => setPrenom(e)}
          style={styles.inputField}
        />
        <TextInput
          placeholder={"Nom"}
          value={nom}
          onChangeText={(e) => setNom(e)}
          style={styles.inputField}
        />
          <Button
                onPress={() => handleSuivant()}
                mode={"contained"}
                style={styles.badgeButton}
              >
                <Text style={styles.badgeButtonActive}>Suivant</Text>
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
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
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
    margin: 30,
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
  inputField: {
    marginTop: 10,
    width: 300,
    height: 50,
  },
});
