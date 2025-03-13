import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useDispatch,
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
  useTheme,
} from "react-native-paper";
import { BACKEND_ADRESS } from "../.config";
import { TABBAR_SIZE } from "../constants";
import Gif from "../components/Gif";
import { useSelector } from "react-redux";

export default function UnsubscribeScreen({ navigation }) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userdata = { email: email, password: password };

  // Se désinscrire, supprimer le compte
  const handleDelete = () => {
    fetch(BACKEND_ADRESS + "/users/unsuscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    })
      .then((response) => response.json())
      .then((data) => {
        navigation.navigate("SignUp");
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <KeyboardAvoidingView
       style={[styles.container, { backgroundColor: theme.colors.background }]}
       behavior={Platform.OS === "ios" ? "padding" : "height"}
     >
      <View style={styles.topContainer}>
        <Text style={styles.mainTitle}>
          Nous sommes tristes{"\n"} de te voir partir 😢
        </Text>
      </View>
      <Text style={styles.text}>
        Pour supprimer ton compte {"\n"}définitivement, renseigne tes identifiants
      </Text>
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
        onPress={() => handleDelete()}
        mode={"outlined"}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonActive}>Supprimer mon compte</Text>
      </Button>
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
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    textAlign: "center",
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  inputField: {
    marginTop: 0,
    width: 350,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    underline: "none",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    marginBottom: 20,
    marginTop: 20,
  },
  fieldTitle: {
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",
    marginBottom: 10,
    marginTop: 20,
  },
  deleteButton: {
    width: "70%",
    margin: 10,
    marginTop: 30,
  },
  deleteButtonActive: {
    color: "#fe5747",
    fontSize: 20,
  },
});
