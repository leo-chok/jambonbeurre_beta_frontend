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

export default function SignUpScreen({ navigation }) {

  const handleSubmit = () => {
    navigation.navigate('TabNavigator', { screen: 'Home' });
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Bienvenue sur Jambon Beurre</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton} onPress={() => handleSubmit()}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <Text style={styles.text}>Vous avez déjà un compte? </Text><Text style={styles.textButton} onPress={() => handleSignIn()}>Se connecter</Text>
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
  }
});
