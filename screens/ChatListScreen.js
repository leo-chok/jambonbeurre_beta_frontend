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

export default function ChatListScreen({ navigation }) {
  const theme = useTheme();
  const avatar = useSelector((state) => state.user.value.infos.avatar);
  const discussions = useSelector(
    (state) => state.discussions.value.discussions
  );
  const username = useSelector((state) => state.user.value.infos.username); //marche pas username vide
  const token = useSelector((state) => state.user.value.authentification.token);
  //console.log("mytoken");
  //console.log(token);
  //console.log("useselector discussion :");
  //console.log(discussions);
  const dispatch = useDispatch();


  //chargement de toutes les discussions de l'utilisateur à partir de son token
  useEffect(() => {
    console.log("chat list screen ");
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
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.header}>Mes conversations 💬</Text>

      <Button
        style={styles.btnNewMessage}
        onPress={() => navigation.navigate("ChatNewConversation")}
        mode={"contained"}
      >
        <Text style={styles.textNewMessage}> Nouveau message </Text>
      </Button>
      <ScrollView style={styles.scrollView}>
        {discussions.map((element) => (
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
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ConversationContainer: {
    height: "22%",
    width: 350,
    backgroundColor: "rgb(0, 108, 72)",
    borderRadius: 20,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  scrollView: {
    marginTop: 50,
  },
  header: {
    width: "100%",
    padding: 34,
    paddingTop: 80,
    textAlign: "center",
    borderBottomColor: "rgb(0, 108, 72)",
    color: "rgb(0, 108, 72)",
    fontSize: 30,
    fontFamily: "LeagueSpartan-SemiBold",
  },
  titleConversation: {
    color: "white",
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    flexShrink: 1, // Permet d'éviter que le texte dépasse si trop long
  },
  btnNewMessage: {
    height: "5%",
    width: "80%",
    borderRadius: 20,
    backgroundColor: "rgb(254, 87, 71)",
  },
  textNewMessage : {
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
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
