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

export default function ChatListScreen({ navigation }) {
  const theme = useTheme();

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
      <Text style={styles.title}>Chat List</Text>
      <ScrollView style={styles.scrollView}>
        {discussions.map((element) => (
          <TouchableOpacity key={element._id} style={styles.listeDesDiscussions} 
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
    alignItems: "center",
    justifyContent: "center",
  },
  listeDesDiscussions:{
    width: "100%",
    backgroundColor: "#397a5b",//vert
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 50,
 
  },
  title:{
    marginTop: 30,
    marginBottom: 20,
      },
      textTitle:{
        color: "white",
        fontSize: 16,
      //  fontFamily: "LeagueSpartan-SemiBold",
        padding: 10,
      }
});
