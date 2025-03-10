import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Text,
} from "react-native";


import { Ionicons } from "@expo/vector-icons"; // Importer les icônes

export default function MakeReservation() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
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
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
