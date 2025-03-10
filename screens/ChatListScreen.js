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
import { chargeDiscussions } from "../reducers/discussions";
import { BACKEND_ADRESS } from "../.config";

export default function ChatListScreen({ navigation }) {
  const discussions = useSelector(
    (state) => state.discussions.value.discussions
  );
  const username = useSelector((state) => state.user.value.infos.username);//marche pas username vide
  const token = useSelector((state) => state.user.value.authentification.token );
  //console.log("mytoken");
  //console.log(token);
  //console.log("useselector discussion :");
  //console.log(discussions);
  const dispatch = useDispatch();

 //chargement de toutes les discussions de l'utilisateur à partir de son token
  useEffect(() => {
    console.log("chat list screen ");
console.log("username : "+username);
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Chat List</Text>
      <ScrollView style={styles.scrollView}>
        {discussions.map((element) => (
          <TouchableOpacity key={element._id} style={styles.discussionContainer} 
          onPress={() =>  navigation.navigate('ChatConversation', element)}>

            <Text style={styles.textTitle}>{element.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  discussionContainer:{
    width: 250,
    backgroundColor: "pink",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 15,
 
  },
  textTitle:{
    marginBottom: 15,
    paddingBottom: 20,
  }
});
