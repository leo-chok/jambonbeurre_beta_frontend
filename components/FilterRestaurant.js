import { useEffect } from "react";
import * as React from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Checkbox,
  List,
  RadioButton,
  Divider,
  Text,
  Dialog,
  useTheme
} from "react-native-paper";
import { BACKEND_ADRESS } from "../.config";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import { useSelector } from "react-redux";
import restaurantsTypes from "../assets/data/restaurantsTypes";

export default function FilterRestaurant(props) {
  const theme = useTheme()
  const filterRestaurant = useSelector((state) => state.restaurantFilter.value);
  // On vient ajouter ou retirer un hobby dans le tableau hobbies
  function updateList(type) {}

  return (
    <View style={[styles.container, {backgrounColor : theme.colors.background}]}>
      {restaurantsTypes.map((type) => (
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
            {type}
          </Text>
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
});
