import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image, Linking } from "react-native";
import { Checkbox, List, RadioButton, Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes

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

  return (
    <View style={styles.container}>
      <Image source={restaurantImage} style={styles.image}></Image>
      <View style={styles.main}>
        <Text style={styles.name}>{props.name}</Text>

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
          <View style={styles.right}>
            <Text style={styles.semibold}>{props.rating}</Text>
            <Ionicons name="star" size={14} color="#026C5D" />
          </View>
        </View>
        <View style={styles.moreInfos}>
          <View style={styles.nav}>
            <Ionicons name="navigate-outline" size={40} color="#fff" />
          </View>
          <View style={styles.website}>
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
  name: {
    fontSize: 26,
    fontWeight: "bold",
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
    width: "70%",
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
    height: 110,
  },
  nav: {
    backgroundColor: "#026C5D",
    padding: 32,
    width: "50%",
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
  },
  website: {
    backgroundColor: "#fff",
    padding: 32,
    width: "50%",
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
    width: "85%",
  },
});
