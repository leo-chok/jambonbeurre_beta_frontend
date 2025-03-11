import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
  useTheme,
} from "react-native-paper";
import { TABBAR_SIZE } from "../constants";
import Gif from "../components/Gif";
import { useSelector } from "react-redux";

export default function SettingsScreen({ navigation }) {
  const theme = useTheme();

  // Modifier son profil : renvoie sur la page de modification du profil
  const handleModify = () => {
    navigation.navigate("ProfileEdition");
  };

  // Se déconnecter : renvoie sur la page de connexion
  const handleSignOut = () => {
    navigation.navigate("SignUp");
  };

  // Se désinscrire/ supprimer le compte : renvoie sur la page de désinscription
  const handleDelete = () => {
    navigation.navigate("Unsubscribe");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ width: 180, height: 180 }}>
        <Gif />
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.mainTitle}>Paramètres 🧑‍🔧</Text>
      </View>
      <Button
        onPress={() => handleModify()}
        mode={"contained"}
        style={styles.badgeButton}
      >
        <Text style={styles.badgeButtonActive}>Modifier mon profil</Text>
      </Button>
      <Button
        onPress={() => handleSignOut()}
        mode={"contained"}
        style={styles.badgeButton}
      >
        <Text style={styles.badgeButtonActive}>Me déconnecter</Text>
      </Button>
      <Button
        onPress={() => handleDelete()}
        mode={"outlined"}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonActive}>Supprimer mon compte</Text>
      </Button>
    </SafeAreaView>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    marginRight: 20,
  },
  badgeButton: {
    width: "70%",
    margin: 10,
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
  deleteButton: {
    width: "70%",
    margin: 10,
  },
  deleteButtonActive: {
    color: "red",
    fontSize: 20,
  },
});
