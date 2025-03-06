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

export default function SignUp2Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
console.log(token)

// Ajouter photo de profil
const handleAddPhoto = () => {
  // route Upload
}

// Prendre une photo
const handleTakePhoto = () => {
  navigation.navigate("Camera");
}

const handleSuivant = () => {
  navigation.navigate("SignUp3");
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Choisissez une photo de profil</Text>
        <Button onPress={() => handleAddPhoto()}
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>Ajouter une photo</Text>
            </Button>
        <Button onPress={() => handleTakePhoto()}
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>Prendre une photo</Text>
            </Button>
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
  badgeButton: {
    width: "60%",
    margin: 10,
  },
  badgeButtonActive: {
    color: "white",
  },
});
