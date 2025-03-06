import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { updatePosition } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput, Modal, Button, Portal, Text } from "react-native-paper";
import Restaurant from "../components/Restaurant";
import { BACKEND_ADRESS } from "../.config";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapRef = React.useRef(null);

  // Paramétrer les états pour les markers des restaurants
  const [markers, setMarkers] = useState([]);

  // Paramétrer les états pour la modale (visible et invisible)
  const [visible, setVisible] = React.useState(false);
  const hideRestaurantModal = () => setVisible(false);

  // Enregistrer les données du restaurant sélectionné dans un setter, qui sera utilisé en props du composants restaurant
  const [dataRestaurant, setDataRestaurant] = useState({});

  // Fonction pour ouvrir une modale au clic sur un marker de restaurant
  const showRestaurantModal = (name) => {
    fetch(BACKEND_ADRESS + `/restaurants/search/${name}`)
      .then((response) => response.json())
      .then((info) => {
        // console.log(JSON.stringify(info, null, 2)); // Sera utile pour les réservations
        let openInfos = info.data.openingHours;
        const isOpenNow = (openInfos) => {
          const now = new Date();
          const currentDay = now.getDay(); // Jour actuel (0 = Dimanche, 6 = Samedi)
          const currentHour = now.getHours(); // Heure actuelle
          const currentMinute = now.getMinutes(); // Minute actuelle

          return openInfos.some(({ open, close }) => {
            if (open.day === currentDay) {
              const openTime = open.hour * 60 + open.minute; // Convertit en minutes totales
              const closeTime = close.hour * 60 + close.minute;
              const nowTime = currentHour * 60 + currentMinute;

              return nowTime >= openTime && nowTime <= closeTime; // Vérifie si on est dans l'intervalle
            }
            return false;
          });
        };

        setDataRestaurant({
          name: info.data.name,
          type: info.data.type,
          priceLevel: info?.data?.priceLevel,
          address: info.data.address,
          rating: info.data.rating,
          location: info.data.location.coordinates,
          website: info?.data?.website,
          openingHours: isOpenNow(openInfos),
        });
      });

    // Rendre visible la modale qui est cachée par défaut
    setVisible(true);
  };

  // Récupérer la localisation, en temps réel, de l'utilisateur
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

          // Récupérer les restaurants, en temps réel, à proximité de l'utilisateur (dans un rayon de 500m)
          fetch(
            BACKEND_ADRESS +
              "/restaurants/near/500?longitude=" +
              latitude +
              "&latitude=" +
              longitude
          )
            .then((response) => response.json())
            .then((data) => {
              // Si des restaurants sont trouvés, les affichés individuellement sur la carte, sous forme de markers
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

  // Bouton pour recentrer la map selon la position de l'utilisateur, en temps réel
  const handleCenter = () => {
    if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
      //mapRef.current?.animateCamera({...}) assure que la carte est bien référencée avant d'exécuter l'animation
      //La fonction handleCenter utilise animateCamera pour déplacer la vue de la carte vers la position actuelle de l'utilisateur avec un zoom adapté.
      mapRef.current?.animateCamera({
        center: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
        //on conserve le zoom initial
        altitude: 500,
        pitch: 45,
        zoom: 18,
      });
    }
  };

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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideRestaurantModal}
          style={styles.modalStyle}
        >
          {/* // Affichage du composant Restaurant avec les données du restaurant
          sélectionné grâce aux props */}
          <Restaurant
            name={dataRestaurant.name}
            type={dataRestaurant.type}
            address={dataRestaurant.address}
            rating={dataRestaurant.rating}
            website={dataRestaurant.website}
            location={dataRestaurant.location}
            priceLevel={dataRestaurant.priceLevel}
            isopen={dataRestaurant.openingHours}
          />
        </Modal>
      </Portal>
      <MapView
        ref={mapRef}
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
        {markers.map((data, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: data.longitude,
              longitude: data.latitude,
            }}
            title={data.name}
            pinColor="green"
            onPress={() => showRestaurantModal(data.name)}
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
          <FontAwesome name="location-arrow" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleFilter()}
        >
          <FontAwesome name="sliders" size={40} color="black" />
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

  modalStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "80%",
  },
});
