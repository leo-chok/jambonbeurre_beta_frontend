import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_ADRESS } from "../.config";

export default function Invitation() {
  const user = useSelector((state) => state.user.value);
  const userToken = user.authentification.token;
  const handleInvitation = async () => {

    console.log("vous avez invité john doe")
    const invitationData = {
      reservationId: restaurantName,
      userId: userToken,
    };

    console.log("user token :", userId)

    try {
      const response = await fetch(
        `${BACKEND_ADRESS}/reservations/invitation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invitationData),
        }
      );

      const data = await response.json();

      if (data.result) {
        Alert.alert("Invitation envoyée!");
      } else {
        Alert.alert(
          "Erreur",
          data.error || "Impossible d'envoyer une invitation"
        );
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue.");
      console.error(error);
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity style={styles.registerbtn} onPress={handleInvitation}>
          <View style={styles.strokeborder}>
            <Ionicons name="person-add-outline" size={32} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.btnlegend}>Inviter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerbtn: {
    backgroundColor: "#FF6C47",
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
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
  btnlegend: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginHorizontal: "auto",
  },
});
