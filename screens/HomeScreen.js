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
import { updatePosition } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADRESS } from "../.config";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          setCurrentPosition({ latitude: latitude, longitude: longitude });
          dispatch(updatePosition(currentPosition));

          fetch(
            BACKEND_ADRESS +
              "/restaurants/near/500?longitude=" +
              latitude +
              "&latitude=" +
              longitude
          )
            .then((response) => response.json())
            .then((data) => {
              // console.log("STOOOOOP");
              //console.log(data.restaurantsList[0].location.coordinates);

              if (data.restaurantsList) {
                setMarkers(
                  data.restaurantsList.map((info, i) => ({
                    id: i,
                    latitude: info.location.coordinates[1],
                    longitude: info.location.coordinates[0],
                    name: info.name,
                  }))
                );
              }
            });
        });
      }
    })();
  }, []);

  //console.log(JSON.stringify(markers, null, 2));

  console.log(currentPosition);

  // Bouton recentrer à faire
  const handleCenter = () => {};

  // Bouton filtres à faire
  const handleFilter = () => {};

  // Afficher les restaurants à proximité
  useEffect(() => {
    fetch(``)
      .then((response) => response.json())
      .then((data) => {
        data.result;
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        camera={{
          center: {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          },
          // Pitch: batiments en 3D
          pitch: 45,
          heading: 0,
          // Altitude: Only on iOS MapKit, in meters. The property is ignored by Google Maps.
          altitude: 500,
          // Zoom: Only when using Google Maps.
          zoom: 18,
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
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.longitude,
              longitude: marker.latitude,
            }}
            title={marker.name}
            pinColor="green"
          />
        ))}
      </MapView>
      <View style={{ position: "absolute", top: 40, width: "95%" }}>
        <TextInput
          style={styles.searchBar}
          placeholder={"Rechercher un restaurant ou un buddy"}
          placeholderTextColor={"#666"}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleCenter()}
        >
          <FontAwesome name="location-arrow" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleFilter()}
        >
          <FontAwesome name="sliders" size={25} color="black" />
        </TouchableOpacity>
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
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    height: 45,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  button: {
    top: 450,
    left: 330,
    margin: 5,
  },
});
