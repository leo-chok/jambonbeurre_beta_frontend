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

import { BACKEND_ADRESS } from "../.config";
export default function ChatNewConversationScreen({ navigation }) {
  const theme = useTheme();

  const [users, setusers] = useState([]);
  const token = useSelector((state) => state.user.value.authentification.token);
  const username = useSelector((state) => state.user.value.infos.username);
  const [listeDesSelectioner, setlisteDesSelectioner] = useState([]); //liste des utilisateurs selectionnés pour la conversation
  let title='';


  useEffect(() => {
    console.log("new conversation");
    //chargement de tous les utilisateurs
    fetch(`${BACKEND_ADRESS}/chats/allUsers`)
      .then((response) => response.json())
      .then((data) => {
        setusers(data.listUsers); //memorise la liste de tous les utilisateurs
       // console.log(data);
      }); //fetch
  }, []);

  function Fvalide() {
    console.log("fonction valide");
  let title = listeDesSelectioner.map((element) => element.username).join("  -  ");
  title = title + "  -  " + username;
    console.log("title : "+title);
    
    fetch(`${BACKEND_ADRESS}/chats/creeUneDiscussion/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        userIdInvite: listeDesSelectioner.map((element) => element.id),
        title: title,
      }),
    }) //fetch
      .then((response) => response.json())
      .then((data) => {
        console.log("data conversation fetch : ");
       // console.log(data);
        //console.log(data.Discussion);
        navigation.navigate("ChatConversation", data.Discussion);
      }); //then fetch
  } //function

  function FselectionneUser(idUser, username) {
    console.log("selectionne user");
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
    //console.log(listeDesSelectioner);
    
  } //function


  
  function FstyleSelectionner(idUser) {
    if (listeDesSelectioner.some((element) => element.id == idUser))
      return styles.viewSelected;
    else return styles.view;
  }
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
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
      <Button
        key="footer"
        style={styles.footer}
        mode={"contained"}
        onPress={() => Fvalide()}
      >creer le chat
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
   
  },
  scrollView: {
   
    marginTop: 50,
    marginBottom: 70,
  },
  footer: {
    position: "absolute", // Positionne le bouton en bas de l'écran
    bottom: 0, // Fixe le bouton en bas
    left: 0,
    right: 0,
    margin: 10,
    width: "70%",
    
   
    
   
  },
  view: {
    width: 250,
    backgroundColor: "#397a5b",//vert
    margin: 2,
    padding: 10,
    borderRadius: 20,
  },
  viewSelected: {
    width: 260,
    backgroundColor:  "#397a",//vert
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
  textmessage: {
    width: 230,
    backgroundColor:  "#397a5b",//vert
    color: "white",
    fontFamily: "LeagueSpartan-Bold",
    borderRadius: 20,
    textAlign: "left",
    paddingLeft: 10,
  },
 
});
