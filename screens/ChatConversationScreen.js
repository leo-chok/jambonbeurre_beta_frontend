import { useEffect , useState } from 'react';
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
} from 'react-native';

export default function ChatConversationScreen({ route }) {

  const [idUser , setIdUser] = useState("");
  const [mymessage , setMymessage] = useState([]);
  const [inputnouveauMessage, setnouveauMessage] = useState("");

 useEffect(() => {
  console.log("hello chat conversation");
  setMymessage(route.params);
  console.log("mymessage");
  console.log(mymessage.messages);
  console.log(route.params);
     
  const token = "-iX_Q1hRBYopsMKtf7ZmMOcOgOBOxIow";
    fetch(`http://192.168.45.244:3000/users/${token}`) 
      .then((response) => response.json())
      .then((data) => {
       // console.log("data conversation fetch : ");
       // console.log(data.userInfos[0]._id);
        setIdUser(data.userInfos[0]._id);
        });//then fetch
}, []);

function handleSubmit() {
  const token = "-iX_Q1hRBYopsMKtf7ZmMOcOgOBOxIow";
  console.log("nouveau message");
  fetch(`http://192.168.45.244:3000/chats/creerUnMessage/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token , idDiscussion: mymessage._id , message: inputnouveauMessage }),
  }) //fetch
    .then((response) => response.json())
    .then((data) => { setnouveauMessage("");
      //afficheUneDiscussion
      fetch(`http://192.168.45.244:3000/chats/creerUnMessage/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token , idDiscussion: mymessage._id }),
      }) //fetch
        .then((response) => response.json())
        .then((data) => {
          console.log("data conversation fetch : ");
          console.log(data);
          //setMymessage(data.discussion);
          
      }); //fetch
     
    });

  
}
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Convesation {idUser}</Text>
         <ScrollView style={styles.scrollView}>
         {mymessage.messages && mymessage.messages.map((element) => (
                <View key={element._id} style={styles.discussionContainer} >
                  <Text style={styles.textmessage}>{element.message}</Text>
                </View>
              ))}
              <TextInput key={"nouveauMessage"} style={styles.nouveauMessage} 
                       value={inputnouveauMessage}
                       onChangeText={setnouveauMessage}
                       placeholder="..."
                       >
                        </TextInput>
                        <Button title="envoyer" onPress={() => handleSubmit()} />
            </ScrollView>
    </KeyboardAvoidingView>
  )
}
/*
  
                */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBouton: {
    width: 250,
    backgroundColor: "blue",
    color : "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
  },
  textmessage: {
    width: 250,
    backgroundColor: "pink",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
  },
});
