import { useState } from "react";

import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import {
  TextInput,
  Text,
  Button,
  HelperText,
  useTheme,
} from "react-native-paper";

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../reducers/user";

export default function SignUp1Screen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let isValid = false;

  // Fetch la route Signup (création d'un utilisateur)
  const userdata = { email: email, password: password };

  const hasErrors = () => {
    return !email.includes("@") || !email.includes(".");
  };

  // Bouton Suivant
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
          if (data.result) {
            dispatch(addToken(data.newUser));
            navigation.navigate("SignUp2");
          } else {
            alert("Un compte utilise déjà cette adresse email");
          }
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
    }
  };

  // On vérifie que les 3 chamsp de textes soient remplis

  if (email !== "" && password !== "" && password2 !== "") {
    isValid = true;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Créé ton compte 🤗</Text>
        <View>
          <Text style={styles.fieldTitle}>Ton adresse e-mail</Text>
          <TextInput
            placeholder={"Ton adresse mail"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={styles.inputField}
            underlineColor="transparent"
          />
          {email.length > 3 && (
            <HelperText type="error" visible={hasErrors()}>
              L'adresse email est invalide
            </HelperText>
          )}

          <Text style={styles.fieldTitle}>Ton mot de passe</Text>
          <TextInput
            placeholder={"Ton mot de passe"}
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
            style={styles.inputField}
            underlineColor="transparent"
          />
          <Text style={styles.fieldTitle}>Confirme ton mot de passe</Text>
          <TextInput
            placeholder={"Vérifions ton mot de passe"}
            value={password2}
            secureTextEntry={true}
            onChangeText={(e) => setPassword2(e)}
            style={styles.inputField}
            underlineColor="transparent"
          />
          <View style={styles.submitContainer}>
            <Button
              // Le mode du bouton change, et devient actif, si les 3 champs sont remplis
              mode={isValid ? "contained" : "contained-tonal"}
              onPress={() => handleSuivant()}
              style={styles.badgeButton}
              disabled={!isValid}
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
    marginBottom: 16,
    textAlign: "center",
  },
  fieldTitle: {
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",
    marginBottom: 10,
    marginTop: 16,
    textAlign: "center",
  },
  inputField: {
    width: 350,
    height: 50,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  submitContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeButton: {
    width: "60%",
    margin: 30,
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
  badgeButtonDisable: {
    color: "grey",
  },
});
