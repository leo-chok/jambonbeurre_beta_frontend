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
  const me = useSelector((state) => state.user.value);
  const suggestBuddies = users.slice(0, 3);
  const restBuddies = users.slice(3);

  const [listeDesSelectioner, setlisteDesSelectioner] = useState([]); //liste des utilisateurs selectionnés pour la conversation
  let title = "";

  useEffect(() => {
    console.log("new conversation");
    //chargement de tous les utilisateurs
    fetch(`${BACKEND_ADRESS}/users/all`)
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.listUsers
          .map((user) => {
            let score = 0;
            if (
              me.preferences.hobbies.some((hobby) =>
                user.preferences.hobbies.includes(hobby)
              )
            ) {
              score += 1;
            }

            if (
              me.preferences.languages.some((languages) =>
                user.preferences.languages.includes(languages)
              )
            ) {
              score += 1;
            }
            if (
              me.preferences.favFood.some((favFood) =>
                user.preferences.favFood.includes(favFood)
              )
            ) {
              score += 1;
            }
            return { ...user, score };
          })
          .sort((a, b) => b.score - a.score);
        setusers(filteredUsers); //memorise la liste de tous les utilisateurs
        if (filteredUsers.length === 0) {
          setusers(data.listUsers);
        } else {
          setusers(filteredUsers);
        }
      });
  }, []);

  function Fvalide() {
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
      return [styles.viewSelected, styles.textSelected];
    else return styles.view;
  }
  console.log(users);
  // Fonction Searchbar: rechercher un utilisateur

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.main}>
        <Text style={styles.mainTitle}>Mes buddies 💃🕺</Text>

        <Searchbar
          style={styles.searchbar}
          placeholder="Rechercher un buddy"
          onChangeText={(value) => setSearch(value)}
          value={search}
        />
        <Text style={styles.section}>Suggestions Buddies : </Text>

        <ScrollView style={{ flex: 1, width: 360, paddingTop: 20 }}>
          {users &&
            suggestBuddies
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
                  <Text style={styles.textmessage}>
                    {element.infos.username}
                  </Text>
                  <Image
                    source={{ uri: element.infos.avatar }}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              ))}
        </ScrollView>
        <Text style={styles.section2}>Contacts : </Text>
        <ScrollView
          style={{
            flex: 1,
            width: 360,
            marginTop: -190,
          }}
        >
      {users &&
          restBuddies
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
                <Image
                    source={{ uri: element.infos.avatar }}
                    style={styles.avatar}
                  />
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
      </View>
      <ScrollView style={styles.scrollView}>
        {users &&
          restBuddies
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
  mainTitle: {
    fontSize: 30,
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    alignText: "center",
    marginRight: 20,
    marginBottom: 16,
  },
  main: {
    width: "100%",
    paddingTop: 90,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 20,
  },
  footer: {
    position: "relative",
    bottom: 0,
    width: "70%",
    marginHorizontal: "auto",
    marginBottom: 10,
    marginTop: 5,
  },
  view: {
    backgroundColor: "rgb(255, 218, 213)",
    margin: 4,
    padding: 12,
    borderRadius: 12,
  },
  viewSelected: {
    backgroundColor: "#fe5747",
    margin: 4,
    padding: 12,
    borderRadius: 12,
  },

  textmessage: {
    width: 300,
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    borderRadius: 12,
    textAlign: 'center',
    marginLeft: 34,
    padding: 8,
    color: "20",

  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  searchbar: {
    width: "80%",
    backgroundColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopLeftRadius: 30,
    },
  section: {
    paddingTop: 40,
    fontSize: 24,
    textAlign: "center",
    color: "#397a5b",
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
  },
  section2: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 210,
    paddingTop: 6,
    paddingBottom: -30,
    color: "#397a5b",
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
  },
  buddies: {
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    marginRight: 245,
    width: 55,
    height: 55,
    borderRadius: 50,
    marginTop: 1,
    marginBottom: 10,
    marginLeft: 10,
  },
});
