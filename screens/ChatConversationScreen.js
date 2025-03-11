import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BACKEND_ADRESS } from "../.config";
import { useDispatch, useSelector } from "react-redux";

export default function ChatConversationScreen({ route }) {

  const [idUser, setIdUser] = useState("");
  const [discussion, setdiscussion] = useState({});//discussion en cours, initialisé par les params
  const [inputnouveauMessage, setnouveauMessage] = useState("");// nouveau message saisie au clavier
  const token = useSelector((state) => state.user.value.authentification.token );
  

  useEffect(() => {
    console.log("chat conversation");
    setdiscussion(route.params);
    console.log("discussion par params");
    //console.log(discussion);
    //console.log(route.params);

  
    fetch(`${BACKEND_ADRESS}/users/${token}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data conversation fetch : ");
        //console.log("iduserr  : "+data.userInfos[0]._id);
        setIdUser(data.userInfos[0]._id);//memorise l'id de l'utilisateur
      }); //then fetch

   
  }, []);



  function handleSubmit() {
    console.log("nouveau message");
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
            //console.log("data conversation fetch : ");
            //console.log(data);
            setdiscussion(data.discussion);
          }); //fetch
      });

    }
    function FstyleMessage(element) {
     // console.log("sender : "+ element.idSender);
     // console.log("idUser : "+idUser);
      if (element.idSender == idUser) return styles.myMessage;
      else return styles.notmyMessage;
    }
    function FWhosendMessage(element) {
      if (element.idSender == idUser) return "";
      else { return discussion.users.find((elementUser) => elementUser._id == element.idSender).infos.username; }
    }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Convesation {idUser}</Text>
      <ScrollView style={styles.scrollView}>
        {discussion.messages &&
          discussion.messages.map((element) => (
            <View key={element._id} style={FstyleMessage(element)}>
              <Text style={styles.textmessage}>{element.message}</Text>
              <Text style={styles.textmessage}>{FWhosendMessage(element)}</Text>
            </View>
          ))}
        <TextInput
          key={"nouveauMessage"}
          style={styles.nouveauMessage}
          value={inputnouveauMessage}
          onChangeText={setnouveauMessage}
          placeholder="..."
        ></TextInput>
        <Button title="envoyer" onPress={() => handleSubmit()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
/*
  
                */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    },
  scrollView:{
    width: "100%",
    backgroundColor: "#ffffff",
    
   
  },
  textmessage: {
    width: 240,
    backgroundColor: "pink",
    borderRadius: 8,
    textAlign: "left",
    margin: 2,
    
  },
  myMessage: {
    width: 250,
    backgroundColor: "pink",
    borderRadius: 8,
    textAlign: "right",
    alignSelf: "flex-end",
    margin: 2,
  },
  notmyMessage: {
    width: 250,
    backgroundColor: "pink",
    borderRadius: 8,
    textAlign: "left", // Align others' messages to the left
    alignSelf: "flex-start",
    margin: 2,
  },
  title:{
marginTop: 30,
  },
});
