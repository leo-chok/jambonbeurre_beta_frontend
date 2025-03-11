import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  

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
export default function ChatScreen({ navigation }) {
  const theme = useTheme();
  const handleList = () => {
    navigation.navigate('ChatList');
  };


  return (
    <KeyboardAvoidingView
    style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.fieldTitle}>Chat</Text>
      <Button style={styles.bouton} onPress={() => handleList()}
          mode={"contained"}>
        Conversation en cours
      </Button>
      <Button style={styles.bouton} onPress={() => navigation.navigate("ChatNewConversation")}
         mode={"contained"}>
        nouvelle conversation
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: "center",
    justifyContent: "center",
  },
  bouton: {
    margin: 50,
    fontFamily: "LeagueSpartan-SemiBold",
  },
  fieldTitle: {
    fontSize: 25,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",//vert
    marginBottom: 50,
    
  },
});
