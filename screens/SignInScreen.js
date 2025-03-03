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

export default function SignInScreen({ navigation }) {

  const handleSubmit = () => {
    navigation.navigate('TabNavigator', { screen: 'Home' });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Bienvenue sur Jambon Beurre</Text>
      <TextInput placeholder="Username" />
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton} onPress={() => handleSubmit()}>Entrer</Text>
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
});
