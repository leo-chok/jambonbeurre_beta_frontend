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

export default function ChatListScreen({ navigation }) {
  const discussions = useSelector(
    (state) => state.discussions.value.discussions
  );
  //console.log("useselector discussion :");
  //console.log(discussions);
  const dispatch = useDispatch();

  //const user = { _id: "67c83293d39cf888fb710f8f" };
  useEffect(() => {
    console.log("hello chat");
    const token = "-iX_Q1hRBYopsMKtf7ZmMOcOgOBOxIow";
    fetch(`http://192.168.45.244:3000/chats/getAllChat/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    }) //fetch
      .then((response) => response.json())
      .then((data) => {
        console.log(data.discussion);
        console.log("dtata");
        if (data.discussion) {
          dispatch(chargeDiscussion(data.discussion));
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
