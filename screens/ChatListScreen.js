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
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { chargeDiscussions } from "../reducers/discussions";
import { BACKEND_ADRESS } from "../.config";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes

export default function ChatListScreen({ navigation }) {
  const theme = useTheme();
  const avatar = useSelector((state) => state.user.value.infos.avatar);
  const discussions = useSelector(
    (state) => state.discussions.value.discussions
  );

  const token = useSelector((state) => state.user.value.authentification.token);
  //console.log("mytoken");
  //console.log(token);
  //console.log("useselector discussion :");
  //console.log(discussions);
  const dispatch = useDispatch();

  //chargement de toutes les discussions de l'utilisateur à partir de son token
  useEffect(() => {
    console.log("chat list screen ");
    // Créer un timer pour actualiser toutes les 5 secondes
    const interval = setInterval(() => {
      console.log("actualisation de la liste des conversations");
      //console.log("username : "+username);
      fetch(`${BACKEND_ADRESS}/chats/getAllChat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      }) //fetch
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.discussion);
          // console.log("data : "+token);
          if (data.discussion) {
            dispatch(chargeDiscussions(data.discussion));
          }
        });
    }, 5000); //timer
    return () => clearInterval(interval);
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.main}>
        <Text style={styles.header}>Mes conversations 💬</Text>

        <Button
          style={styles.btnNewMessage}
          onPress={() => navigation.navigate("ChatNewConversation")}
          mode={"contained"}
        >

          <Text style={styles.textNewMessage}> Nouveau message </Text>
        </Button>
        <ScrollView style={styles.scrollView}>
          {discussions
            .slice()
            .reverse()
            .map((element) => (
              <TouchableOpacity
                key={element._id}
                style={styles.ConversationContainer}
                onPress={() => navigation.navigate("ChatConversation", element)}
              >
                <Image
                  source={{ uri: element.users[0].infos.avatar }}
                  style={styles.avatar}
                />
                <Text style={styles.titleConversation}>{element.title}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  main: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  ConversationContainer: {
    height: 100,
    width: 345,
    backgroundColor: "#397a5b",
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  scrollView: {
    marginTop: 24,
    marginBottom: 90,
  },
  header: {
    width: "100%",
    padding: 16,
    paddingLeft: 5,
    paddingTop: 40,
    textAlign: "center",
    borderBottomColor: "#397a5b",
    color: "#fe5747",
    fontSize: 30,
    fontFamily: "LeagueSpartan-Bold",
    marginHorizontal: "auto",
  },

  titleConversation: {
    color: "white",
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    flexShrink: 1, // Permet d'éviter que le texte dépasse si trop long
  },
  btnNewMessage: {
    height: "5%",
    borderRadius: 20,
    backgroundColor: "rgb(254, 87, 71)",
    justifyContent: "center",
    marginHorizontal: "auto",
    alignContent: "center",
    alignItems: "center",

  },

  textNewMessage: {
    fontSize: 20,
    color: "white",
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#ccc", // Si l'image ne charge pas
    marginRight: 20,
  },
});
