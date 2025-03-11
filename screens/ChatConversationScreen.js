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

import { BACKEND_ADRESS } from "../.config";
import { useDispatch, useSelector } from "react-redux";

export default function ChatConversationScreen({ route }) {
  const theme = useTheme();

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
    style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}> {discussion.title}</Text>
      <ScrollView  style={[styles.ScrollView, { backgroundColor: theme.colors.background }]}>
        {discussion.messages &&
          discussion.messages.map((element) => (
            <View key={element._id} style={FstyleMessage(element)}>
              <Text style={styles.textmessagequi}>{FWhosendMessage(element)}</Text>
              <Text style={styles.textmessagequoi}>{element.message}</Text>
              
            </View>
          ))}
        <TextInput
          key={"nouveauMessage"}
          style={styles.nouveauMessage}
          value={inputnouveauMessage}
          onChangeText={setnouveauMessage}
          placeholder="nouveau message ..."
        ></TextInput>
        <Button  onPress={() => handleSubmit()} mode={"contained"} style={styles.buttonEnvoyer} > envoyer</Button>
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
   
    },
    ScrollView:{
    width: "100%",
    backgroundColor: "#ffffff",
    
   
  },
  textmessagequi: {
    width: 220,
    //backgroundColor: "#397a5b",//vert
    color:"#397a5b",//vert
    fontFamily: "LeagueSpartan-Bold",
    borderRadius: 20,
    textAlign: "center",

    
    
  },
  textmessagequoi: {
    width: 220,
    backgroundColor: "#397a5b",//vert
    color: "white",
    borderRadius: 20,
    textAlign: "left",
    padding: 10,
    
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
  title:{
marginTop: 30,
marginBottom: 20,
backgroundColor: "#E5410A",
color: "white",//"#E5410A",//"#397a5b",//vert
fontSize: 20,
    fontFamily: "LeagueSpartan-Bold",

  },
  buttonEnvoyer:{
    width: 250,
    margin: 30,
  },
  nouveauMessage: {
    marginTop: 0,
    width: 350,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    underline: "none",
  },
});
