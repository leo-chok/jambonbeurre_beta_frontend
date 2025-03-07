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
import { chargeDiscussion } from "../reducers/discussions";
import { BACKEND_ADRESS } from "../.config";
export default function ChatNewConversationScreen({ navigation }) {
  const [users, setusers] = useState([]);
  useEffect(() => {
    console.log("hello new conversation");
    const token = "-iX_Q1hRBYopsMKtf7ZmMOcOgOBOxIow";
    fetch(`${BACKEND_ADRESS}/users/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.listUsers[0].infos);
        setusers(data.listUsers);
      }); //fetch
  }, []);

  function FhandleInvite(idUser) {
    console.log("hello invite");
    const token = "-iX_Q1hRBYopsMKtf7ZmMOcOgOBOxIow";
    fetch(`${BACKEND_ADRESS}/chats/creeUneDiscussion/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        userIdInvite: idUser,
        title: "hello",
      }),
    }) //fetch
      .then((response) => response.json())
      .then((data) => {
        //console.log("data conversation fetch : ");
        console.log(data.idDiscussion);
      }); //then fetch
  } //function

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        {users &&
          users.map((element) => (
            <TouchableOpacity key={element._id} style={styles.view}
              onPress={() => FhandleInvite(element._id)}>
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
    backgroundColor: "#ffffff",
  },
  view: {
    width: 250,
    backgroundColor: "pink",
    margin: 2,
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
