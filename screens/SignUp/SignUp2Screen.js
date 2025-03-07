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
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { BACKEND_ADRESS } from "../../.config";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addPhoto } from "../../reducers/user";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp2Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  console.log(token);
  let isValid = false;

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: .3,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsLoading(true);
      const photoUri = result.assets[0].uri;

      // enregistrer la photo sur cloudinary + sur BDD
      const formData = new FormData();
      formData.append("photoFromFront", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      fetch(BACKEND_ADRESS + "/avatar/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(addPhoto(data.url));

          const dataUpdate = { token: token, avatar: data.url };

          fetch(BACKEND_ADRESS + "/users/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUpdate),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setIsLoading(false);
              navigation.navigate("SignUp3");
            });
        })
        .catch((e) => console.log(e));
    } else {
      alert("Vous devez choisir une photo de profil");
    }
  };

  // Prendre une photo
  const handleTakePhoto = () => {
    navigation.navigate("Camera", {from: "SignUp2"});
  };

  const handleSuivant = () => {
    navigation.navigate("SignUp3");
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Choisissez une photo de profil</Text>
      <View style={styles.main}>
        <View style={styles.containerImage}>
          {!image && (
            <Image
              source={require("../../assets/logo/avatar_defaut.png")}
              style={styles.image}
            />
          )}
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        {isLoading && (
          <ActivityIndicator size={120} animating={true} color={"white"} />
        )}
        {!isLoading && (
          <View>
            <Button
              onPress={pickImage}
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>Depuis son téléphone</Text>
            </Button>

            <Button
              onPress={() => handleTakePhoto()}
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>Prendre une photo</Text>
            </Button>
          </View>
        )}
      </View>
      <View style={styles.navigationBottom}>
        <Button
          onPress={() => handleSuivant()}
          mode={"contained"}
          style={styles.badgeButton}
        >
          <Text style={styles.badgeButtonActive}>Ignorer</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  badgeButton: {
    width: 200,
    margin: 10,
  },
  badgeButtonActive: {
    color: "white",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 175,
  },
  navigationBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
