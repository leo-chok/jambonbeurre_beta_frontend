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
} from "react-native-paper";

import { BACKEND_ADRESS } from "../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../reducers/user";

export default function SignInScreen({ navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  // Fetch la route SignIn (se connecter)
  const userdata = { email: email, password: password };

  const handleSubmit = () => {
    fetch(BACKEND_ADRESS + "/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.result) {
                dispatch(addToken(data.userToken));
                navigation.navigate('TabNavigator', { screen: 'Home' });
              } else {
                alert("Mauvais identifiants");
              }
            })
            .catch((error) => { console.error("Erreur:", error) })
        }
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image source={require("../assets/logo/logoSeul.png")} style={styles.logo} />
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe5f6",
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
    fontFamily: "league-spartan",
    marginBottom: 20,
    marginTop: 20,
  },
  fieldTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#397a5b",
    marginBottom: 20,
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
    width: 250,
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
      backgroundColor: "#fe5747",
    },
    badgeButtonActive: {
      color: "white",
      fontSize: 20,
    },
});
