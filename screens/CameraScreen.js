import { useEffect, useState, useRef } from "react";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addPhoto, removePhoto } from "../reducers/user";
import { BACKEND_ADRESS } from "../.config";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function CameraScreen({ navigation }) {
  const token = useSelector((state) => state.user.value.authentification.token);
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [facing, setFacing] = useState("front");
  const [flashStatus, setFlashStatus] = useState("off");
  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = navigation;
  console.log(goBack);
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashStatus = () => {
    setFlashStatus((current) => (current === "off" ? "on" : "off"));
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    setIsLoading(true);

    // enregistrer la photo sur cloudinary + sur BDD
    const formData = new FormData();
    formData.append("photoFromFront", {
      uri: photo?.uri,
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
            goBack();
          });
      })
      .catch((e) => console.log(e));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingContainer}>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={toggleFlashStatus}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashStatus === "on" ? "#e8be4b" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={toggleCameraFacing}
        >
          <FontAwesome name="rotate-right" size={25} color="black" />
        </TouchableOpacity>
      </View>
      {!isLoading && (
        <View style={styles.preview}>
          <CameraView
            style={styles.camera}
            ref={(ref) => (cameraRef.current = ref)}
            facing={facing}
            flash={flashStatus}
          ></CameraView>
        </View>
      )}
      {isLoading && (
        <ActivityIndicator size={120} animating={true} color={"white"} />
      )}
      <View style={styles.snapContainer}>
        <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
          <FontAwesome name="circle-thin" size={95} color="black" />
        </TouchableOpacity>
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
    paddingTop: 50,
  },
  preview: {
    height: 300,
    width: 300,
    borderRadius: 150,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    height: 300,
    width: 300,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-around",
    width: "60%",
  },
  settingButton: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  snapButton: {
    width: 100,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
