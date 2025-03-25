import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
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

import { BACKEND_ADRESS } from "../config";
import { useDispatch, useSelector } from "react-redux";

export default function ChatConversationScreen({ route }) {
  const theme = useTheme();

  const [idUser, setIdUser] = useState("");
  const [discussion, setdiscussion] = useState(route.params); //discussion en cours, initialisé par les params

  const [inputnouveauMessage, setnouveauMessage] = useState(""); // nouveau message saisie au clavier
  const token = useSelector((state) => state.user.value.authentification.token);

  useEffect(() => {
    setdiscussion(route.params);

    fetch(`${BACKEND_ADRESS}/users/${token}`)
      .then((response) => response.json())
      .then((data) => {
        setIdUser(data.userInfos[0]._id); //memorise l'id de l'utilisateur
      }); //then fetch

    // Créer un timer pour actualiser toutes les 5 secondes
    const interval = setInterval(() => {
      if (discussion._id == undefined) return;

      fetch(`${BACKEND_ADRESS}/chats/afficheUneDiscussion/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token, idDiscussion: discussion._id }),
      }) //fetch
        .then((response) => response.json())
        .then((data) => {
          setdiscussion(data.discussion);
        }); //fetch
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit() {
    if(inputnouveauMessage=="") return;
    fetch(`${BACKEND_ADRESS}/chats/creerUnMessage/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        idDiscussion: discussion._id,
        message: inputnouveauMessage,
      }),
    }) //fetch
      .then((response) => response.json())
      .then((data) => {
        setnouveauMessage("");
        //afficheUneDiscussion
        fetch(`${BACKEND_ADRESS}/chats/afficheUneDiscussion/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token, idDiscussion: discussion._id }),
        }) //fetch
          .then((response) => response.json())
          .then((data) => {
            setdiscussion(data.discussion);
          }); //fetch
      });
  }
  function FstyleMessage(element) {
    if (element.idSender == idUser) return styles.myMessage;
    else return styles.notmyMessage;
  }
  function FWhosendMessage(element) {
    if (element.idSender == idUser) return "";
    else {
      return discussion.users.find(
        (elementUser) => elementUser._id == element.idSender
      ).infos.username;
    }
  }
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>✉️ {discussion.title}</Text>
      <ScrollView
        style={[
          styles.ScrollView,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {discussion.messages &&
          discussion.messages.map((element) => (
            <View key={element._id} style={FstyleMessage(element)}>
              <Text style={styles.textmessagequi}>
                {FWhosendMessage(element)}
              </Text>
              <Text style={styles.textmessagequoi}>{element.message}</Text>
            </View>
          ))}
      </ScrollView>
      <TextInput
        key={"nouveauMessage"}
        style={styles.nouveauMessage}
        value={inputnouveauMessage}
        onChangeText={setnouveauMessage}
        placeholder="nouveau message..."
        underlineColor="transparent"
      ></TextInput>
      <Button
        onPress={() => handleSubmit()}
        mode={"contained"}
        style={styles.buttonEnvoyer}
      >
        <Text style={styles.textButton}>Envoyer</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}
/*
  
                */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  ScrollView: {
    width: "100%",
  },
  textmessagequi: {
    width: 220,
    //backgroundColor: "#397a5b",//vert
    color: "grey", //vert
    fontFamily: "LeagueSpartan-Bold",
    borderRadius: 20,
    textAlign: "left",
    marginHorizontal: 30,
    marginBottom: 5,
  },
  textmessagequoi: {
    width: 220,
    backgroundColor: "#397a5b", //vert
    color: "white",
    borderRadius: 20,
    textAlign: "center",
    padding: 10,
    marginHorizontal: "auto",
    fontSize: 16,
  },
  myMessage: {
    width: 250,
    // backgroundColor: "#397a5b",//vert
    borderRadius: 20,
    textAlign: "right",
    alignSelf: "flex-end",
    margin: 2,

  },
  notmyMessage: {
    width: 250,
    // backgroundColor: "#397a5b",//vert
    borderRadius: 20,
    textAlign: "left", // Align others' messages to the left
    alignSelf: "flex-start",
    margin: 2,
  },
  title: {
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,  
    marginHorizontal: "auto",
    textAlign: "center",
    color: "#fe5747",
    fontSize: 30,
    fontFamily: "LeagueSpartan-Bold",
  },
  buttonEnvoyer: {
    width: 250,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: "auto",
    fontSize: 20,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  },
  nouveauMessage: {
    width: 350,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: "auto",
    marginTop: 20,
  },
});
