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
  ActivityIndicator,
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
import { addToken } from "../../reducers/user";
import Schedule from "../../components/Schedule";

export default function SignUp6Screen({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.value);
  const userReducer = useSelector((state) => state.user.value);
  const token = useSelector((state) => state.user.value.authentification.token);
  const lastLunchTime = useSelector(
    (state) => state.user.value.preferences.lunchtime
  );
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  console.log(userReducer);

  const handleSuivant = () => {
    setIsLoading(true);
    // On récupère le lunchtime depuis le reducer car il est modifié dans le composant Schedule

 // Enregistrement BDD
    const dataBDD = {
      token: token,
      lunchtime: lastLunchTime,
    };
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log("User updated in BDD");
        navigation.navigate("SignUp7");
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
          Indique nous tes disponibilités, {"\n"}on te proposera des
          utilisateurs {"\n"}sur les mêmes crénaux !
        </Text>
        {!isLoading ? (
          <ScrollView style={styles.inputs_container}>
            <List.Accordion title="Créneaux Déjeuner" style={styles.inputList}>
              <Schedule data={userData?.preferences?.lunchtime} />
            </List.Accordion>
          </ScrollView>
        ) : (
          <ActivityIndicator size={120} animating={true} color={"white"} />
        )}
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
});
