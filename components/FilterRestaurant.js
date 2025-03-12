import { useEffect } from "react";
import * as React from "react";

import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { BACKEND_ADRESS } from "../.config";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import { useDispatch, useSelector } from "react-redux";
import restaurantsTypes from "../assets/data/restaurantsTypes";
import {
  emptyFilter,
  fillFilter,
  setFilter,
} from "../reducers/restaurantFilter";

export default function FilterRestaurant(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filterRestaurant = useSelector((state) => state.restaurantFilter.value);

  // On vient ajouter ou retirer un hobby dans le tableau hobbies
  function updateList(type) {
    dispatch(setFilter(type));
  }

  function emptyList() {
    dispatch(emptyFilter());
  }

  function fillList() {
    dispatch(fillFilter());
  }

  const buttons = restaurantsTypes.map((type) => {
    let textButton = "Restaurant";

    if (type === "hamburger_restaurant") {
      textButton = "Hamburger";
    } else if (type === "bakery") {
      textButton = "Boulangerie";
    } else if (type === "sports_activity_location") {
      textButton = "Lieu de sport";
    } else if (type === "coffee_shop") {
      textButton = "Café";
    } else if (type === "video_arcade") {
      textButton = "Salle d'arcade";
    } else if (type === "hotel") {
      textButton = "Hotel";
    } else if (type === "bar") {
      textButton = "Bar";
    } else if (type === "italian_restaurant") {
      textButton = "Italien";
    } else if (type === "movie_theater") {
      textButton = "Cinéma";
    } else if (type === "shopping_mall") {
      textButton = "Centre Commercial";
    } else if (type === "supermarket") {
      textButton = "Supermarché";
    } else if (type === "store") {
      textButton = "Boutique";
    } else if (type === "brunch_restaurant") {
      textButton = "Restaurant Brunch";
    } else if (type === "casino") {
      textButton = "Casino";
    } else if (type === "pizza_restaurant") {
      textButton = "Pizza";
    } else if (type === "restaurant") {
      textButton = "Restaurant";
    } else if (type === "thai_restaurant") {
      textButton = "Thailandais";
    } else if (type === "food_store") {
      textButton = "Magasin";
    } else if (type === "chinese_restaurant") {
      textButton = "Chinois";
    } else if (type === "french_restaurant") {
      textButton = "Grastronomie Française";
    } else if (type === "sandwich_shop") {
      textButton = "Sandwicherie";
    } else if (type === "fast_food_restaurant") {
      textButton = "Fast Food";
    } else if (type === "tea_house") {
      textButton = "Salon de Thé";
    } else if (type === "meal_takeaway") {
      textButton = "A emporter";
    } else if (type === "japanese_restaurant") {
      textButton = "Japonais";
    } else {
    }

    return (
      <Button
        key={type}
        mode={(filterRestaurant.includes(type) && "contained") || "outlined"}
        onPress={() => updateList(type)}
        style={styles.badgeButton}
      >
        <Text
          style={[
            styles.badgeButtonActive,
            filterRestaurant.includes(type)
              ? styles.badgeButtonActive
              : styles.badgeButtonDisable,
          ]}
        >
          {textButton}
        </Text>
      </Button>
    );
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.tertiary }]}>
        Filtre tes restaurants
      </Text>
      <View style={styles.selects}>
        <Button
          onPress={() => fillList()}
          mode={"contained"}
          style={styles.badgeButton}
        >
          <Text style={styles.badgeButtonActive}>Tout sélectionner</Text>
        </Button>
        <Button
          onPress={() => emptyList()}
          mode={"contained"}
          style={styles.badgeButton}
        >
          <Text style={styles.badgeButtonActive}>Tout déselectionner</Text>
        </Button>
      </View>
      <Divider style={{ marginTop: 5, marginBottom: 5 }} />
      <ScrollView>
        <View style={styles.buttonsContainer}>{buttons}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingBottom: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "LeagueSpartan-Bold",
    letterSpacing: -1,
    textAlign: "center",
  },
  selects: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonsContainer: {
    flex: 1,
    height: "90%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Active: {
    color: "white",
    fontSize: 20,
  },
  badgeButton: {
    marginTop: 5,
    width: "100%",
  },
  badgeButtonActive: {
    color: "white",
  },
  badgeButtonDisable: {
    color: "black",
  },
});
