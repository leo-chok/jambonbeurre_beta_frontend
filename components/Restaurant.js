import * as React from "react";

import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import { useSelector } from "react-redux";
import JoinReservation from "../components/JoinReservation";

export default function Restaurant(props) {
  let restaurantId = props.id;
  let restaurantName = props.name;
  let restaurantType = props.type;
  // Image sur la modale
  const restaurantImages = {
    hamburger_restaurant: require("../assets/restaurants_img/burger.jpg"),
    bakery: require("../assets/restaurants_img/bakery.jpg"),
    sports_activity_location: require("../assets/restaurants_img/restaurant.jpg"),
    coffee_shop: require("../assets/restaurants_img/coffee-shop.jpg"),
    video_arcade: require("../assets/restaurants_img/restaurant.jpg"),
    hotel: require("../assets/restaurants_img/restaurant.jpg"),
    bar: require("../assets/restaurants_img/bar.jpg"),
    italian_restaurant: require("../assets/restaurants_img/italian.jpg"),
    movie_theater: require("../assets/restaurants_img/restaurant.jpg"),
    shopping_mall: require("../assets/restaurants_img/restaurant.jpg"),
    supermarket: require("../assets/restaurants_img/supermarket.jpg"),
    store: require("../assets/restaurants_img/supermarket.jpg"),
    brunch_restaurant: require("../assets/restaurants_img/brunch.jpg"),
    casino: require("../assets/restaurants_img/casino.jpg"),
    pizza_restaurant: require("../assets/restaurants_img/italian.jpg"),
    restaurant: require("../assets/restaurants_img/restaurant.jpg"),
    thai_restaurant: require("../assets/restaurants_img/thai.jpg"),
    food_store: require("../assets/restaurants_img/supermarket.jpg"),
    chinese_restaurant: require("../assets/restaurants_img/chinese.jpg"),
    french_restaurant: require("../assets/restaurants_img/french.jpg"),
    sandwich_shop: require("../assets/restaurants_img/bakery.jpg"),
    fast_food_restaurant: require("../assets/restaurants_img/fast-food.jpg"),
    tea_house: require("../assets/restaurants_img/tea.jpg"),
    meal_takeaway: require("../assets/restaurants_img/take-away.jpg"),
    japanese_restaurant: require("../assets/restaurants_img/japanese.jpg"),
  };
  // Traduction française des types de restaurants Google
  const typeInFrench = (restaurantType) => {
    let textButton = "Restaurant";
    if (restaurantType === "hamburger_restaurant") {
      textButton = "Hamburger";
    } else if (restaurantType === "bakery") {
      textButton = "Boulangerie / Pâtisserie";
    } else if (restaurantType === "sports_activity_location") {
      textButton = "Lieu de sport";
    } else if (restaurantType === "coffee_shop") {
      textButton = "Café";
    } else if (restaurantType === "video_arcade") {
      textButton = "Salle d'arcade";
    } else if (restaurantType === "hotel") {
      textButton = "Hotel";
    } else if (restaurantType === "bar") {
      textButton = "Bar";
    } else if (restaurantType === "italian_restaurant") {
      textButton = "Italien";
    } else if (restaurantType === "movie_theater") {
      textButton = "Cinéma";
    } else if (restaurantType === "shopping_mall") {
      textButton = "Centre Commercial";
    } else if (restaurantType === "supermarket") {
      textButton = "Supermarché";
    } else if (restaurantType === "store") {
      textButton = "Boutique";
    } else if (restaurantType === "brunch_restaurant") {
      textButton = "Restaurant Brunch";
    } else if (restaurantType === "casino") {
      textButton = "Casino";
    } else if (restaurantType === "pizza_restaurant") {
      textButton = "Pizza";
    } else if (restaurantType === "restaurant") {
      textButton = "Restaurant";
    } else if (restaurantType === "thai_restaurant") {
      textButton = "Thailandais";
    } else if (restaurantType === "food_store") {
      textButton = "Magasin";
    } else if (restaurantType === "chinese_restaurant") {
      textButton = "Chinois";
    } else if (restaurantType === "french_restaurant") {
      textButton = "Grastronomie Française";
    } else if (restaurantType === "sandwich_shop") {
      textButton = "Sandwicherie";
    } else if (restaurantType === "fast_food_restaurant") {
      textButton = "Fast Food";
    } else if (restaurantType === "tea_house") {
      textButton = "Salon de Thé";
    } else if (restaurantType === "meal_takeaway") {
      textButton = "A emporter";
    } else if (restaurantType === "japanese_restaurant") {
      textButton = "Japonais";
    }

    return textButton;
  };

  const textType = typeInFrench(restaurantType);

  const restaurantImage =
    restaurantImages[props.type] ||
    require("../assets/restaurants_img/restaurant.jpg");

  // Créer la navigation vers le restaurant depuis Google maps

  // // Calculer la distance entre l'utilisateur et le restaurant affiché dans la modale

  const { calculateDistance } = require("../modules/calculateDistance");
  const userLocation = useSelector(
    (state) => state.user.value.infos.location.coordinates
  );

  // Récupérer la distance et la convertir en m
  let distance =
    calculateDistance(
      props.location[0],
      props.location[1],
      userLocation[0],
      userLocation[1]
    ) * 1000;

  distance = Math.trunc(distance);

  // Fonction pour ouvrir le restaurant dans google maps
  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.container}>
      <Image source={restaurantImage} style={styles.image}></Image>
      <View style={styles.main}>
        <Text style={styles.h1}>{props.name}</Text>

        <View style={styles.header}>
          <View style={styles.left}>
            <View style={styles.basicInfos}>
              <Text style={styles.semibold}>{textType}</Text>

              {props.priceLevel === "PRICE_LEVEL_EXPENSIVE" && (
                <View style={styles.budget}>
                  <Ionicons name="logo-euro" size={14} color="#026C5D" />
                  <Ionicons name="logo-euro" size={14} color="#026C5D" />
                  <Ionicons name="logo-euro" size={14} color="#026C5D" />
                </View>
              )}
              {props.priceLevel === "PRICE_LEVEL_MODERATE" && (
                <View style={styles.budget}>
                  <Ionicons name="logo-euro" size={14} color="#026C5D" />
                  <Ionicons name="logo-euro" size={14} color="#026C5D" />
                </View>
              )}
              {props.priceLevel === "PRICE_LEVEL_INEXPENSIVE" && (
                <View style={styles.budget}>
                  <Ionicons name="logo-euro" size={14} color="#026C5D" />
                </View>
              )}
            </View>
            <Text style={styles.bodytext}>{props.address}</Text>
          </View>
          {props.rating && (
            <View style={styles.right}>
              <Text style={styles.semibold}>{props.rating}</Text>
              <Ionicons name="star" size={14} color="#026C5D" />
            </View>
          )}
        </View>
        <View style={styles.moreInfos}>
          <TouchableOpacity
            style={styles.nav}
            onPress={() => {
              openURL(props.directionUri);
            }}
          >
            <View>
              <Ionicons name="navigate-outline" size={40} color="#fff" />
              <Text style={styles.distance}>{distance}m</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.whitecard}>
            <View style={styles.websitewrapper}>
              <Text
                style={styles.semibold}
                onPress={() => Linking.openURL(props.website)}
              >
                Site web
              </Text>
              <Ionicons
                style={styles.rotate}
                name="arrow-forward"
                size={24}
                color="#202020"
                onPress={() => Linking.openURL(props.website)}
              />
            </View>
            <View style={styles.openNow}>
              <View>
                {props.isopen ? (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#026C5D"
                  />
                ) : (
                  <Ionicons
                    name="close-circle-outline"
                    size={24}
                    color="#202020"
                  />
                )}
              </View>
              <Text style={styles.bodytext}>
                {props.isopen ? <Text>Ouvert</Text> : <Text>Fermé</Text>}
              </Text>
            </View>
          </View>
        </View>
        <View></View>

        <JoinReservation
          restaurantId={restaurantId}
          restaurantName={restaurantName}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF4E9",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -100,
    borderColor: "#026C5D",
    borderWidth: 3,
  },
  h1: {
    fontSize: 26,
    marginHorizontal: "auto",
    marginBottom: 8,
    fontFamily: "OldStandard-Bold",
  },
  bodytext: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
  },
  main: {
    gap: 16,
    position: "relative",
    top: -70,
    width: "100%",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "top",
    flexDirection: "row",

    gap: 16,
  },
  left: {
    width: "65%",
  },
  right: {
    width: "30%",
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  semibold: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  basicInfos: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  budget: {
    flexDirection: "row",
  },
  moreInfos: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    alignItems: "center",
    height: 105,
  },
  nav: {
    backgroundColor: "#026C5D",
    padding: 32,
    width: "47%",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    height: "100%",
    gap: 6,
  },
  distance: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "white",
  },
  whitecard: {
    backgroundColor: "#fff",
    padding: 32,
    width: "48%",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    gap: 8,
    height: "100%",
    justifyContent: "center",
  },
  websitewrapper: {
    flexDirection: "row",
    gap: 16,
  },
  rotate: {
    display: "inline-block",
    transform: "rotate(-45deg)",
  },
  openNow: {
    flexDirection: "row",
    alignItems: "center",
    borderBlockColor: "#202020",
    borderWidth: 1,
    borderRadius: 100,
    padding: 8,
    gap: 4,
    width: "90%",
  },
  h2: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Montserrat-SemiBold",
  },
  reservation: {
    position: "relative",
    height: "auto%",
    width: "100%",
    justifyContent: "top",
    alignItems: "center",
  },
  registerbtn: {
    backgroundColor: "#FF6C47",
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  strokeborder: {
    backgroundColor: "#transparent",
    width: 64,
    height: 64,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFF",
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  gallery: {
    flexDirection: "row",
    gap: 16,
  },
});
