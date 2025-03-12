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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.tertiary }]}>
        Filtrer vos restaurants
      </Text>
      <View style={styles.selects}>
        <Button
          onPress={() => fillList()}
          mode={"outlined"}
          style={styles.badgeButton}
        >
          <Text style={styles.buttonActive}>Tout sélectionner</Text>
        </Button>
        <Button
          onPress={() => emptyList()}
          mode={"outlined"}
          style={styles.badgeButton}
        >
          <Text style={styles.buttonActive}>Tout déselectionner</Text>
        </Button>
      </View>
      <Divider style={{ marginTop: 5, marginBottom: 5 }} />
      <ScrollView>
        <View style={styles.buttonsContainer}>
          {restaurantsTypes.map((type) => (
            <Button
              key={type}
              mode={
                (filterRestaurant.includes(type) && "contained") || "outlined"
              }
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
                {type}
              </Text>
            </Button>
          ))}
        </View>
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
  buttonActive: {
    color: "#fe5747",
  },
  badgeButtonDisable: {
    color: "black",
  },
});
