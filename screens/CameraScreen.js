import { useEffect, useState, useRef } from "react";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
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
  View
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addPhoto, removePhoto } from "../reducers/user";

export default function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [facing, setFacing] = useState("back");
  const [flashStatus, setFlashStatus] = useState("off");

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    photo && console.log(photo);
    console.log(photo.uri);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashStatus = () => {
    setFlashStatus((current) => (current === "off" ? "on" : "off"));
  };

  // enregistrer la photo
//   const formData = new FormData();
//   formData.append("photoFromFront", {
//     uri: photo?.uri,
//     name: "photo.jpg",
//     type: "image/jpeg",
//   });
// console.log('test')
//   fetch("http://10.1.3.69:3000/upload", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       photo && dispatch(addPhoto(photo.uri));
//       console.log(data)
//     })
//     .catch(e => console.log(e))
// };

  return (
    <CameraView
      style={styles.camera}
      ref={(ref) => (cameraRef.current = ref)}
      facing={facing}
      flash={flashStatus}
    >
      <SafeAreaView style={styles.settingContainer}>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={toggleFlashStatus}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashStatus === "on" ? "#e8be4b" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={toggleCameraFacing}
        >
          <FontAwesome name="rotate-right" size={25} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.snapContainer}>
        <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
          <FontAwesome name="circle-thin" size={95} color="white" />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
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
