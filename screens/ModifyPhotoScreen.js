import { useState } from "react";

import {
  Image,
  StyleSheet,
  View,
} from "react-native";

import { Text, Button, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { BACKEND_ADRESS } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "./../reducers/user";
import { SafeAreaView } from "react-native-safe-area-context";
import Gif from "../components/Gif";

export default function ModifyPhotoScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const imageReducer = useSelector((state) => state.user.value.infos.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  // --------------------- FONCTION POUR CHOISIR UNE PHOTO DE SON TELEPHONE ---------------------------------
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.canceled) {
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
          // Enregistrement REDUCER
          dispatch(addPhoto(data.url));

          const dataUpdate = { token: token, avatar: data.url };
          // Enregistrement BDD
          fetch(BACKEND_ADRESS + "/users/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUpdate),
          })
            .then((response) => response.json())
            .then((data) => {
              setIsLoading(false);
            });
        })
        .catch((e) => console.log(e));
    } else {
      alert("Vous devez choisir une photo de profil");
    }
  };

  // --------------------- FONCTION POUR PRENDRE UNE PHOTO ---------------------------------

  const handleTakePhoto = () => {
    navigation.navigate("Camera", { from: "ProfileScreen" });
  };

  // --------------------- FONCTION POUR PRENDRE UNE PHOTO ---------------------------------

  const handleSuivant = () => {
    navigation.navigate("TabNavigator", { screen: "ProfileScreen" });
  };

  // --------------------- RENDER ---------------------------------

  return (
    <SafeAreaView
      // style={styles.container}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {isLoading && (
        <View style={{ width: 180, height: 180, marginBlock: "auto" }}>
          <Gif />
        </View>
      )}
      {!isLoading && (
        <>
          <Text style={styles.title}>Choisis ta photo {"\n"}de profil 📸</Text>
          <View style={styles.main}>
            <View style={styles.containerImage}>
              {imageReducer === "" ? (
                <Image
                  source={require("./../assets/logo/avatar_defaut.png")}
                  style={styles.image}
                />
              ) : (
                <Image source={{ uri: imageReducer }} style={styles.image} />
              )}
            </View>

            <View>
              <Button
                onPress={pickImage}
                mode={"outlined"}
                style={styles.photoButton}
              >
                <Text style={styles.photoButtonActive}>
                  Depuis son téléphone
                </Text>
              </Button>

              <Button
                onPress={() => handleTakePhoto()}
                mode={"outlined"}
                style={styles.photoButton}
              >
                <Text style={styles.photoButtonActive}>Prendre une photo</Text>
              </Button>
            </View>
          </View>
          <View style={styles.navigationBottom}>
            <Button
              onPress={() => handleSuivant()}
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>Valider</Text>
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  badgeButton: {
    width: 250,
    margin: 10,
  },
  photoButton: {
    width: 250,
    margin: 10,
  },
  badgeButtonActive: {
    color: "white",
    fontSize: 20,
  },
  photoButtonActive: {
    color: "#fe5747",
    fontSize: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 175,
  },
  containerImage: {
    marginBottom: 15,
    marginHorizontal: "auto",
  },
  navigationBottom: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
