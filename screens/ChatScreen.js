import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ChatScreen({ navigation }) {

  const handleList = () => {
    navigation.navigate('ChatList');
  };

  const handleConversation = () => {
    navigation.navigate('ChatConversation');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.textButton} onPress={() => handleList()}>
        List
      </Text>
      <Text style={styles.textButton} onPress={() => handleConversation()}>
        Conversation
      </Text>
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
  textButton: {
    color: '#ec6e5b',
    margin:'15'
  }
});
