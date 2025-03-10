import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { BACKEND_ADRESS } from "../.config";
export default function ChatNewConversationScreen({ navigation }) {
  const [users, setusers] = useState([]);
  const token = useSelector((state) => state.user.value.authentification.token);
  const [listeDesSelectioner, setlisteDesSelectioner] = useState([]); //liste des utilisateurs selectionnés pour la conversation
  let title='';


  useEffect(() => {
    console.log("new conversation");
    //chargement de tous les utilisateurs
    fetch(`${BACKEND_ADRESS}/chats/allUsers`)
      .then((response) => response.json())
      .then((data) => {
        setusers(data.listUsers); //memorise la liste de tous les utilisateurs
        console.log(data);
      }); //fetch
  }, []);

  function Fvalide() {
    console.log("fonction valide");
  
    
    fetch(`${BACKEND_ADRESS}/chats/creeUneDiscussion/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        userIdInvite: listeDesSelectioner.map((element) => element.id),
        title: "hello",
      }),
    }) //fetch
      .then((response) => response.json())
      .then((data) => {
        console.log("data conversation fetch : ");
        console.log(data);
        console.log(data.Discussion);
        navigation.navigate("ChatConversation", data.Discussion);
      }); //then fetch
  } //function

  function FselectionneUser(idUser, username) {
    console.log("hello selectionne user");
    if (listeDesSelectioner.some((element) => element.id == idUser)) {
      setlisteDesSelectioner((listeDesSelectioner) =>
        listeDesSelectioner.filter((element) => element.id !== idUser)
      );
    } else {
      setlisteDesSelectioner((listeDesSelectioner) => [
        ...listeDesSelectioner,
        { id: idUser, username: username },
      ]);
    }
    console.log(listeDesSelectioner);
    
  } //function


  
  function FstyleSelectionner(idUser) {
    if (listeDesSelectioner.some((element) => element.id == idUser))
      return styles.viewSelected;
    else return styles.view;
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        {users &&
          users.map((element) => (
            <TouchableOpacity
              key={element._id}
              style={FstyleSelectionner(element._id)}
              onPress={() =>
                FselectionneUser(element._id, element.infos.username)
              }
            >
              <Text style={styles.textmessage}>{element.infos.username}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        key="footer"
        style={styles.footer}
        onPress={() => Fvalide()}
      >
        <Text style={styles.textmessage}>creer le chat</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  scrollView: {
    paddingTop: 10,
    paddingBottom: 80,
  },
  footer: {
    position: "absolute", // Positionne le bouton en bas de l'écran
    bottom: 0, // Fixe le bouton en bas
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#00f", // Facultatif : pour bien distinguer le bouton
  },
  view: {
    width: 250,
    backgroundColor: "pink",
    margin: 2,
    padding: 10,
    borderRadius: 8,
  },
  viewSelected: {
    width: 250,
    backgroundColor: "red",
    margin: 20,
    padding: 10,
    borderRadius: 8,
  },
  textmessage: {
    width: 240,
    backgroundColor: "pink",
    borderRadius: 8,
    textAlign: "left",
  },
});
