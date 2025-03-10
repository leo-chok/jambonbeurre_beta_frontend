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
  useTheme
} from "react-native-paper";

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../reducers/user";

export default function SignUp3Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const theme = useTheme();
  const [pseudo, setPseudo] = useState("");

  // Création du pseudo
  const userdata = { token: token, username: pseudo };

  const handleSuivant = () => {
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("SignUp4");
      });
  };
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View sytle={styles.main}>
        <Text style={styles.title}>Ton profil 🧑‍💻</Text>
        <Text style={styles.text}>
          Choisis le nom sous lequel tu apparaitras {'\n'}auprès de tes futurs buddies
          !
        </Text>
        <TextInput
          placeholder={"pseudo"}
          value={pseudo}
          onChangeText={(e) => setPseudo(e)}
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
    flexDirection: "column",
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
