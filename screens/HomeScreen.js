import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          setCurrentPosition({ latitude: latitude, longitude: longitude });
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        camera={{
          center: {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          },
          pitch: 45,
          heading: 0,
          // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
          altitude: 500,
          // Only when using Google Maps.
          zoom: 18,
          markers: []
        }}
        style={styles.map}
      >
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="Ma Position"
            pinColor="red"
          />
        )}
      </MapView>
      <View style={{ position: 'absolute', top: 40, width: '95%' }}>
    <TextInput
      style={styles.searchBar}
      placeholder={'Rechercher un restaurant ou un buddy'}
      placeholderTextColor={'#666'}
    />
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    borderRadius: 10,
    margin: 10,
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    height: 45,
    paddingHorizontal: 10,
    fontSize: 15,
  },
});
