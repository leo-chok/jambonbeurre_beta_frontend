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

export default function ProfileEditionScreen({ navigation }) {

  const handleCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Profile Editor</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton} onPress={() => handleCamera()}>Prendre une photo</Text>
            </TouchableOpacity>
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
  },
});