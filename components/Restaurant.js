import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  Checkbox,
  List,
  RadioButton,
  Divider,
  Text,
  Dialog,
} from "react-native-paper";
import { BACKEND_ADRESS } from "../.config";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import { useSelector } from "react-redux";

export default function Restaurant(props) {
  // Image sur la modale
  let restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  if (props.type === "hamburger_restaurant") {
    restaurantImage = require("../assets/restaurants_img/burger.jpg");
  } else if (props.type === "bakery") {
    restaurantImage = require("../assets/restaurants_img/bakery.jpg");
  } else if (props.type === "sports_activity_location") {
    restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  } else if (props.type === "coffee_shop") {
    restaurantImage = require("../assets/restaurants_img/coffee-shop.jpg");
  } else if (props.type === "video_arcade") {
    restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  } else if (props.type === "hotel") {
    restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  } else if (props.type === "bar") {
    restaurantImage = require("../assets/restaurants_img/bar.jpg");
  } else if (props.type === "italian_restaurant") {
    restaurantImage = require("../assets/restaurants_img/italian.jpg");
  } else if (props.type === "movie_theater") {
    restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  } else if (props.type === "shopping_mall") {
    restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  } else if (props.type === "supermarket") {
    restaurantImage = require("../assets/restaurants_img/supermarket.jpg");
  } else if (props.type === "store") {
    restaurantImage = require("../assets/restaurants_img/supermarket.jpg");
  } else if (props.type === "brunch_restaurant") {
    restaurantImage = require("../assets/restaurants_img/brunch.jpg");
  } else if (props.type === "casino") {
    restaurantImage = require("../assets/restaurants_img/casino.jpg");
  } else if (props.type === "pizza_restaurant") {
    restaurantImage = require("../assets/restaurants_img/italian.jpg");
  } else if (props.type === "restaurant") {
    restaurantImage = require("../assets/restaurants_img/restaurant.jpg");
  } else if (props.type === "thai_restaurant") {
    restaurantImage = require("../assets/restaurants_img/thai.jpg");
  } else if (props.type === "food_store") {
    restaurantImage = require("../assets/restaurants_img/supermarket.jpg");
  } else if (props.type === "chinese_restaurant") {
    restaurantImage = require("../assets/restaurants_img/chinese.jpg");
  } else if (props.type === "french_restaurant") {
    restaurantImage = require("../assets/restaurants_img/french.jpg");
  } else if (props.type === "sandwich_shop") {
    restaurantImage = require("../assets/restaurants_img/bakery.jpg");
  } else if (props.type === "fast_food_restaurant") {
    restaurantImage = require("../assets/restaurants_img/fast-food.jpg");
  } else if (props.type === "tea_house") {
    restaurantImage = require("../assets/restaurants_img/tea.jpg");
  } else if (props.type === "meal_takeaway") {
    restaurantImage = require("../assets/restaurants_img/take-away.jpg");
  } else if (props.type === "japanese_restaurant") {
    restaurantImage = require("../assets/restaurants_img/japanese.jpg");
  } else {
  }

  // Modifier le titre du restaurant
  String.prototype.Capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

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

  // Récupérer les réservation
  useEffect(() => {
    const token = "tZz3VkDLAWtSCoQiQqzxDFya4yRletps";
    fetch(BACKEND_ADRESS + `/reservation//${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("reservations are find !!!");
          dispatch(displayReservations(data.data));
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={restaurantImage} style={styles.image}></Image>
      <View style={styles.main}>
        <Text style={styles.h1}>{props.name}</Text>

        <View style={styles.header}>
          <View style={styles.left}>
            <View style={styles.basicInfos}>
              <Text style={styles.semibold}>{props?.type?.Capitalize()}</Text>
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
        <View style={[styles.whitecard, styles.reservation]}>
          <Text style={styles.h2}>Aucune réservation en cours</Text>
          <View style={styles.gallery}>
            <View>
              <TouchableOpacity style={styles.registerbtn}>
                <View style={styles.strokeborder}>
                  <Ionicons name="add-outline" size={32} color="#FFF" />
                </View>
              </TouchableOpacity>
              <Text style={styles.bodytext}>Je m'inscris</Text>
            </View>
            <TouchableOpacity style={[styles.registerbtn]}></TouchableOpacity>
          </View>
        </View>
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
