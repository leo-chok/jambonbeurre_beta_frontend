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
import { Searchbar } from "react-native-paper";

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
import { useSelector } from "react-redux";
import { addDiscussionToStore } from "../reducers/discussions";

import { BACKEND_ADRESS } from "../.config";
import { ScreenStackHeaderSearchBarView } from "react-native-screens";
export default function ChatNewConversationScreen({ navigation }) {
  const theme = useTheme();


  const [users, setusers] = useState([]);
  const token = useSelector((state) => state.user.value.authentification.token);
  const username = useSelector((state) => state.user.value.infos.username);
  const [search, setSearch] = useState("");
 console.log("username : " + username);
  
  const [listeDesSelectioner, setlisteDesSelectioner] = useState([]); //liste des utilisateurs selectionnés pour la conversation
  let title = "";

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
    let title = listeDesSelectioner
      .map((element) => element.username)
      .join("  -  ");
    title = title + "  -  " + username;
    console.log("title : " + title);

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
        console.log("conversation creer : ");
        // console.log(data);
        console.log(data.Discussion);
        // dispatch(addDiscussionToStore(data.Discussion));
        //console.log("dispatch");
        setlisteDesSelectioner([]);
        navigation.navigate("ChatConversation", data.Discussion);
      }); //then fetch
  } //function

  function FselectionneUser(idUser, username) {
    console.log("selectionne user");
    if (listeDesSelectioner.some((element) => element.id == idUser)) {
      //deselection du user
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

  // Fonction Searchbar: rechercher un utilisateur


  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Searchbar style={styles.searchbar}
                placeholder="Rechercher un buddy"
                onChangeText={(value) => setSearch(value)}
                value={search}
               // onIconPress={handleSearch}
               // onSubmitEditing={handleSearch}
              />
     
      <ScrollView style={styles.scrollView}>
        {users &&
          users
            .filter((element) => element.infos.username !== username)
            .filter((element) => element.infos.username.includes(search))
            .map((element) => (
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
      >
        <Text style={styles.textButton}>Écrire</Text>
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
  scrollView: {
    marginTop: 10,
    marginBottom: 70,
  },
  footer: {
    position: "absolute", // Positionne le bouton en bas de l'écran
    bottom: 0, // Fixe le bouton en bas
    width: "70%",
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  view: {
    width: 250,
    backgroundColor: "rgb(255, 218, 213)", //vert
    margin: 2,
    padding: 10,
    borderRadius: 20,
  },
  viewSelected: {
    width: 250,
    backgroundColor: "pink", //vert
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
  textmessage: {
    width: 230,
    fontSize: 20,
    backgroundColor: "rgb(255, 218, 213)", //vert
    color: "darkGrey",
    fontFamily: "LeagueSpartan-SemiBold",
    borderRadius: 20,
    textAlign: "center",
    paddingLeft: 10,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  searchbar: {
    marginTop: 50,
    width: "80%",
    height: 50,
    backgroundColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,  
  },
});
