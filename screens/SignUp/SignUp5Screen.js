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

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../reducers/user";

export default function SignUp5Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
console.log(token)
const [work, setWork] = useState("");

  const userdata = { token: token, work: work };

  const handleSuivant = () => {
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("SignUp6");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Ton profil</Text>
        <Text style={styles.text}>
          Tu veux indiquer ce que tu fais ?
        </Text>   
                <TextInput
                  placeholder={"Métiers/ études"}
                  value={work}
                  onChangeText={(e) => setWork(e)}
                  style={styles.inputField}
                />    
        <View>
            <Text style={styles.textButton} onPress={() => handleSuivant()}>
              Suivant
            </Text>
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
  inputField: {
    marginTop: 10,
    width: 300,
    height: 50,
  },
});
