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

export default function SignUp5Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const userReducer = useSelector((state) => state.user.value);
  const [work, setWork] = useState("");
  const theme = useTheme();
  console.log(userReducer);

  const handleSuivant = () => {
    // Enregistrement Reducer
    const dataReducer = { description: { work: work } };
    dispatch(updateProfile(dataReducer));

    // Enregistrement BDD
    const dataBDD = { token: token, work: work };
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("SignUp6");
      });
  };

  const handleIgnore = () => {
    navigation.navigate("SignUp6");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Ton profil 🧑‍💻</Text>
        <Text style={styles.text}>Tu veux indiquer ce que tu fais ?</Text>
        <TextInput
          placeholder={"Métiers/ études"}
          value={work}
          onChangeText={(e) => setWork(e)}
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
    marginTop: 20,
    marginHorizontal: "auto",
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
    width: 350,
    height: 50,
    marginTop: 20,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
