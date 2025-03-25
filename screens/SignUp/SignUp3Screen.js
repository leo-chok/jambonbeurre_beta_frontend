import { useState } from "react";

import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { TextInput, Text, Button, useTheme } from "react-native-paper";

import { BACKEND_ADRESS } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { addToken, updateProfile } from "../../reducers/user";

export default function SignUp3Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);

  const theme = useTheme();
  const [pseudo, setPseudo] = useState("");
  let isValid = false;

  // Création du pseudo

  const handleSuivant = () => {
    const dataReducer = {
      infos: {
        username: pseudo,
      },
    };
    // Enregistrement Reducer
    dispatch(updateProfile(dataReducer));

    // Enregistrement BDD
    const dataBDD = { token: token, username: pseudo };
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("SignUp4");
      });
  };

  if (pseudo !== "") {
    isValid = true;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View sytle={styles.main}>
        <Text style={styles.title}>Ton profil 🧑‍💻</Text>
        <Text style={styles.text}>
          Choisis le nom sous lequel tu apparaitras {"\n"}auprès de tes futurs
          buddies !
        </Text>
        <TextInput
          placeholder={"Pseudo"}
          value={pseudo}
          onChangeText={(e) => setPseudo(e)}
          style={styles.inputField}
          underlineColor="transparent"
        />
        <Button
          onPress={() => handleSuivant()}
          mode={"contained"}
          style={styles.badgeButton}
          disabled={!isValid}
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
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
    marginHorizontal: "auto",
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
  inputField: {
    marginTop: 10,
    marginHorizontal: "auto",
    width: 350,
    height: 50,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
