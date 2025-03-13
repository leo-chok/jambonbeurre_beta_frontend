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
import {
  TextInput,
  Modal,
  Button,
  Portal,
  Text,
  Searchbar,
  useTheme,
} from "react-native-paper";
import FilterRestaurant from "../components/FilterRestaurant";
import Restaurant from "../components/Restaurant";
import mapStyle from "../assets/data/mapStyle";
import { BACKEND_ADRESS } from "../.config";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import OthersProfileScreen from "./OthersProfileScreen";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const userAvatar = useSelector((state) => state.user.value.infos.avatar);
  const filterRestaurant = useSelector((state) => state.restaurantFilter.value);
  const userReducer = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapRef = React.useRef(null);

  //////////////////////RECUPERER LA LOCALISATION EN TEMPS REEL//////////////////////

  useEffect(() => {
    (async () => {
      // Afficher une alerte explicative avant la demande de permission
      Alert.alert(
        "Autorisation de localisation",
        "Nous avons besoin de ta position pour te proposer les meilleurs restaurants autour de toi.",
        [
          {
            text: "Annuler",
            style: "cancel",
          },
          {
            text: "Autoriser",
            onPress: async () => {
              const result = await Location.requestForegroundPermissionsAsync();
              if (result.status === "granted") {
                const location = await Location.getCurrentPositionAsync({});
                const latitude = location.coords.latitude;
                const longitude = location.coords.longitude;

                setCurrentPosition({ latitude, longitude });
                dispatch(updatePosition([longitude, latitude]));
              }
            },
          },
        ]
      );
    })();
  }, []);

  //////////////////////AFFICHER LES RESTAURANTS A PROXIMITE//////////////////////
  // Paramétrer les états pour les markers des restaurants
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    (async () => {
      // Récupérer les restaurants, en temps réel, à proximité de l'utilisateur (dans un rayon de 500m)
      fetch(
        BACKEND_ADRESS +
          "/restaurants/near/1000?longitude=" +
          currentPosition.longitude +
          "&latitude=" +
          currentPosition.latitude
      )
        .then((response) => response.json())
        .then((data) => {
          // Si des restaurants sont trouvés, les affichés individuellement sur la carte, sous forme de markers
          if (data.restaurantsList) {
            setMarkers(
              data.restaurantsList.map((info, i) => ({
                id: i,
                longitude: info.location.coordinates[0],
                latitude: info.location.coordinates[1],
                name: info.name,
                type: info.type,
              }))
            );
          }
        });
    })();
  }, [currentPosition]);

  //////////////////////AFFICHER LES UTILISATEURS A PROXIMITE//////////////////////
  // Paramétrer les états pour les markers des restaurants
  const [usersMarkers, setUsersMarkers] = useState([]);
  useEffect(() => {
    (async () => {
      // Récupérer les autres utilisateurs, en temps réel, à proximité de l'utilisateur (dans un rayon de 500m)
      fetch(
        BACKEND_ADRESS +
          "/users/near/1000?longitude=" +
          currentPosition.longitude +
          "&latitude=" +
          currentPosition.latitude
      )
        .then((response) => response.json())
        .then((data) => {
          // Si des utilisateurs sont trouvés, les affichés individuellement sur la carte, sous forme de markers
          if (data) {
            setUsersMarkers(
              data.listUsers.map((data) => ({
                id: data._id,
                longitude: data.infos.location.coordinates[0],
                latitude: data.infos.location.coordinates[1],
                username: data.infos.username,
                avatar: data.infos.avatar,
              }))
            );
          }
        });
    })();
  }, [currentPosition]);

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

  //////////////////////MODALE POUR AFFICHER LES RESTAURANTS AU CLIC//////////////////////

  // Paramétrer les états pour la modale (visible et invisible)
  const [visible, setVisible] = useState(false);
  const hideRestaurantModal = () => setVisible(false);

  // Enregistrer les données du restaurant sélectionné dans un setter, qui sera utilisé en props du composants restaurant
  const [dataRestaurant, setDataRestaurant] = useState({});

  //affichage conditionnel
  // comment vérifgier objet vide

  // Fonction pour ouvrir une modale au clic sur un marker de restaurant
  const showRestaurantModal = (name) => {
    fetch(BACKEND_ADRESS + `/restaurants/search/${name}`)
      .then((response) => response.json())
      .then((info) => {
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
          id: info.data._id,
          name: info.data.name,
          type: info.data.type,
          priceLevel: info?.data?.priceLevel,
          address: info.data.address,
          rating: info.data.rating,
          location: info.data.location.coordinates,
          directionUri: info.data.directionUri,
          website: info?.data?.website,
          openingHours: isOpenNow(openInfos),
        });
      });

    // Rendre visible la modale qui est cachée par défaut
    setVisible(true);
  };

  //////////////////////BARRE DE RECHERCHE//////////////////////
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return; // Éviter les recherches vides

    fetch(BACKEND_ADRESS + `/restaurants/search/${searchQuery}`)
      .then((response) => response.json())
      .then((info) => {
        if (!info.data) return; // Vérifier si des données sont retournées

        let openInfos = info.data.openingHours;
        const isOpenNow = (openInfos) => {
          const now = new Date();
          const currentDay = now.getDay();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();

          return openInfos.some(({ open, close }) => {
            if (open.day === currentDay) {
              const openTime = open.hour * 60 + open.minute;
              const closeTime = close.hour * 60 + close.minute;
              const nowTime = currentHour * 60 + currentMinute;
              return nowTime >= openTime && nowTime <= closeTime;
            }
            return false;
          });
        };

        const restaurantLocation = info.data.location.coordinates;
        const latitude = restaurantLocation[1]; // latitude du restaurant
        const longitude = restaurantLocation[0]; // longitude du restaurant

        setDataRestaurant({
          id: info.data._id,
          name: info.data.name,
          type: info.data.type,
          priceLevel: info?.data?.priceLevel,
          address: info.data.address,
          rating: info.data.rating,
          location: restaurantLocation,
          directionUri: info.data.directionUri,
          website: info?.data?.website,
          openingHours: isOpenNow(openInfos),
        });

        setVisible(true); // Afficher la modale
        setSearchQuery("");

        // Décaler la vue vers le haut pour éviter que le marker soit caché
        if (restaurantLocation) {
          mapRef.current?.animateCamera({
            center: {
              latitude: latitude - 0.00099, // Ajuste cette valeur si nécessaire
              longitude: longitude,
            },
            altitude: 500,
            pitch: 45,
            zoom: 18,
          });
        }
      })
      .catch((error) => console.error("Erreur lors de la recherche :", error));
  };

  //////////////////////MODAL DES FILTRES//////////////////////
  const [filterVisibility, setFilterVisibility] = useState(false);
  // Bouton filtres à faire
  const handleFilter = () => {
    setFilterVisibility(!filterVisibility);
  };

  ////////////////////// CUSTOMISATION DES MARKERS DES UTILISATEURS  //////////////////////
  // Style des markers d'utilisateurs  sur la carte
  const nearUsersMarkers = usersMarkers.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: data.latitude,
          longitude: data.longitude,
        }}
        title={data.username}
        onPress={() => navigation.navigate("OtherProfile", { userId: data.id })}
        style={{ display: "flex", resizeMode: "contain" }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 5,
            borderColor: theme.colors.primary,
            display: "flex",
          }}
          source={{ uri: data.avatar }}
          resizeMode="contain"
        />
      </Marker>
    );
  });

  ////////////////////// CUSTOMISATION DES MARKERS DES RESTAURANTS  //////////////////////
  // Style des markers de restaurants sur la carte
  const restaurantsMarkers = markers.map((data, i) => {
    if (filterRestaurant.includes(data.type)) {
      let imageMarker = require("../assets/restaurants_icons/restaurant.png");
      if (data.type === "hamburger_restaurant") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "bakery") {
        imageMarker = require("../assets/restaurants_icons/brunch.png");
      } else if (data.type === "sports_activity_location") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "coffee_shop") {
        imageMarker = require("../assets/restaurants_icons/bar.png");
      } else if (data.type === "video_arcade") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "hotel") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "bar") {
        imageMarker = require("../assets/restaurants_icons/bar.png");
      } else if (data.type === "italian_restaurant") {
        imageMarker = require("../assets/restaurants_icons/italian.png");
      } else if (data.type === "movie_theater") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "shopping_mall") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "supermarket") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "store") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "brunch_restaurant") {
        imageMarker = require("../assets/restaurants_icons/brunch.png");
      } else if (data.type === "casino") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "pizza_restaurant") {
        imageMarker = require("../assets/restaurants_icons/italian.png");
      } else if (data.type === "restaurant") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "thai_restaurant") {
        imageMarker = require("../assets/restaurants_icons/thai.png");
      } else if (data.type === "food_store") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "chinese_restaurant") {
        imageMarker = require("../assets/restaurants_icons/japanese.png");
      } else if (data.type === "french_restaurant") {
        imageMarker = require("../assets/restaurants_icons/restaurant.png");
      } else if (data.type === "sandwich_shop") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "fast_food_restaurant") {
        imageMarker = require("../assets/restaurants_icons/burger.png");
      } else if (data.type === "tea_house") {
        imageMarker = require("../assets/restaurants_icons/brunch.png");
      } else if (data.type === "meal_takeaway") {
        imageMarker = require("../assets/restaurants_icons/fastfood.png");
      } else if (data.type === "japanese_restaurant") {
        imageMarker = require("../assets/restaurants_icons/japanese.png");
      } else {
      }

      return (
        <Marker
          key={i}
          coordinate={{
            latitude: data.latitude,
            longitude: data.longitude,
          }}
          title={data.name}
          image={imageMarker}
          onPress={() => showRestaurantModal(data.name)}
        ></Marker>
      );
    }
  });

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideRestaurantModal}
          contentContainerStyle={styles.modalStyle}
        >
          <Ionicons
            style={styles.closemodale}
            name="close-outline"
            size={40}
            color="#20202"
            onPress={hideRestaurantModal}
          />
          {Object.keys(dataRestaurant).length > 0 && (
            <Restaurant
              id={dataRestaurant.id}
              name={dataRestaurant.name}
              type={dataRestaurant.type}
              address={dataRestaurant.address}
              rating={dataRestaurant.rating}
              website={dataRestaurant.website}
              location={dataRestaurant.location}
              directionUri={dataRestaurant.directionUri}
              priceLevel={dataRestaurant.priceLevel}
              isopen={dataRestaurant.openingHours}
            />
          )}
        </Modal>
      </Portal>
      <Portal>
        <Modal
          //Modal pour filtre restaurants
          visible={filterVisibility}
          onDismiss={handleFilter}
          contentContainerStyle={styles.filterModalStyle}
        >
          <Ionicons
            style={styles.closemodale}
            name="close-outline"
            size={40}
            color="#20202"
            onPress={handleFilter}
          />
          <FilterRestaurant />
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
        customMapStyle={mapStyle}
      >
        {currentPosition && (
          <Marker coordinate={currentPosition} title="Ma Position">
            {/* <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 5,
                borderColor: theme.colors.secondary,
              }}
              source={{ uri: userAvatar }}
            /> */}
          </Marker>
        )}
        {restaurantsMarkers}
        {nearUsersMarkers}
      </MapView>
      <View style={styles.wrapper}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Rechercher un restaurant"
          onChangeText={setSearchQuery}
          onIconPress={handleSearch}
          onSubmitEditing={handleSearch}
          value={searchQuery}
        />
        <View style={styles.mapActions}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleFilter()}>
            <Ionicons name="options-outline" size={32} color="#202020" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleCenter()}>
            <Ionicons name="locate" size={32} color="#202020" />
          </TouchableOpacity>
        </View>
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
  wrapper: {
    position: "absolute",
    top: 40,
    width: "100%",
    height: "100%",
    padding: 16,
    flexDirection: "column",
    alignItems: "right",
  },
  searchbar: {
    backgroundColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  mapActions: {
    position: "absolute",
    top: "15%",
    right: 16,
    gap: 16,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },

  modalStyle: {
    position: "absolute",
    bottom: -35,
    width: "100%",
    height: "85%",
  },

  filterModalStyle: {
    position: "absolute",
    alignSelf: "center",
    width: "70%",
    height: "80%",
  },
  closemodale: {
    position: "absolute",
    right: 14,
    top: 14,
    zIndex: 1,
  },
  markerRestaurants: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 200,
    height: 200,
  },
});
