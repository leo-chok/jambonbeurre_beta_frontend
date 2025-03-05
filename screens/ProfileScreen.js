import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function ProfileScreen({ navigation }) {

  const handleSubmit = () => {
    navigation.navigate('ProfileEdition');
  };

  const handleCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Profile</Text>
              <Text style={styles.textButton} onPress={() => handleSubmit()}>Modifier</Text>
              <Text style={styles.textButton} onPress={() => handleCamera()}>Camera</Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#ec6e5b',
  }
});