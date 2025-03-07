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
        <Text style={styles.title}>Créé ton compte</Text>
        <View>
          <Text style={styles.fieldTitle}>Ton adresse e-mail</Text>
          <TextInput
            placeholder={"Ton adresse mail"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={styles.inputField}
            underlineColor="transparent"
          />
          {email.length > 3 && 
            <HelperText type="error" visible={hasErrors()}>
              Email address is invalid!
            </HelperText>
          }
          
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
              // Le mode du bouton change si les 3 champs sont remplis
              mode={(isValid ? "contained" : "contained-tonal")}
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
    backgroundColor: "#ffe5f6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",
    marginBottom: 10,
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
  submitContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  badgeButtonDisable: {
    color: "grey",
  },
});
