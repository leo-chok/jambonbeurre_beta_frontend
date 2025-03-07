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
  HelperText,
} from "react-native-paper";

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../reducers/user";

export default function SignUp1Screen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let isValid = false;

  // Fetch la route Signup (création d'un utilisateur)
  const userdata = { email: email, password: password };

  const hasErrors = () => {
    
      return !email.includes("@");
    
  };
  const handleSuivant = () => {
    if (password !== password2) {
      alert("Les mots de passe ne correspondent pas");
    } else {
      fetch(BACKEND_ADRESS + "/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch(addToken(data.newUser));
          navigation.navigate("SignUp2");
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
    }
  };

  if (email !== "" && password !== "" && password2 !== "") {
    isValid = true;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Création de compte</Text>
        <View>
          <Text style={styles.title}>Ton adresse e-mail</Text>
          <TextInput
            placeholder={"Ton adresse mail"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={styles.inputField}
          />
          {email.length > 3 && 
            <HelperText type="error" visible={hasErrors()}>
              Email address is invalid!
            </HelperText>
          }
          
          <Text style={styles.title}>Ton mot de passe</Text>
          <TextInput
            placeholder={"Ton mot de passe"}
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
            style={styles.inputField}
          />
          <Text style={styles.title}>Confirme ton mot de passe</Text>
          <TextInput
            placeholder={"Vérifions ton mot de passe"}
            value={password2}
            secureTextEntry={true}
            onChangeText={(e) => setPassword2(e)}
            style={styles.inputField}
          />
          <View style={styles.submitContainer}>
            <Button
              // Le mode du bouton change si les 3 champs sont remplis
              mode={(isValid && "contained") || "outlined"}
              onPress={() => handleSuivant()}
              style={styles.badgeButton}
            >
              <Text
                style={[
                  styles.badgeButtonActive,
                  isValid
                    ? styles.badgeButtonActive
                    : styles.badgeButtonDisable,
                ]}
              >
                Suivant
              </Text>
            </Button>
          </View>
        </View>
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  textButton: {
    color: "#ec6e5b",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  submitContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  },
  badgeButton: {
    width: "40%",
  },
  badgeButtonActive: {
    color: "white",
  },
  badgeButtonDisable: {
    color: "black",
  },
});
