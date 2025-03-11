import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import { BACKEND_ADRESS } from "../.config";

export default function JoinReservation(reservationinfos) {
  let reservationData = reservationinfos.reservationinfos.data;
  let reservationDataId = reservationData[0]._id;

  const user = useSelector((state) => state.user.value);
  const userToken = user.authentification.token;
  const avatar = user.infos.avatar;
  const username = user.infos.username;

  const [joinReservationConfirmed, setjoinReservationConfirmed] =
    useState(false);


  const handlejoin = async () => {
    if (!userToken) {
      Alert.alert("Erreur", "Veuillez vous connecter pour réserver.");
      return;
    }
  
    const joinReservation = {
      reservationId: reservationDataId,
      token: userToken,
    };
  
    try {
      const response = await fetch(`${BACKEND_ADRESS}/reservations/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joinReservation),
      });
  
      const data = await response.json();
  
      if (data.result || data.error === "Utilisateur déjà invité") {
        setjoinReservationConfirmed(true);
      } else {
        Alert.alert("Erreur", data.error || "Impossible de rejoindre la réservation.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue.");
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.whitecard}>
          <View>
            {joinReservationConfirmed ? (
              <View>
                <Image
                  style={styles.avatar}
                  source={avatar && { uri: `${avatar}` }}
                />
                <Text style={styles.btnlegend}>{username}</Text>
              </View>
            ) : (
              <View style={styles.gallery}>
                <View>
                  <Text style={styles.h2}>Un événement a venir !</Text>

                  <TouchableOpacity
                    style={styles.registerbtn}
                    onPress={() => handlejoin()}
                  >
                    <View style={styles.strokeborder}>
                      <Ionicons name="add-outline" size={32} color="#FFF" />
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.btnlegend}>Je m'inscris</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "45%",
    top: -15,
  },
  whitecard: {
    gap: 8,
    width: "100%",
    backgroundColor: "#fff",
    padding: 32,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    height: "auto",
    alignItems: "center",
  },

  h2: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Montserrat-SemiBold",
  },
  registerbtn: {
    backgroundColor: "#FF6C47",
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginHorizontal: "auto",
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
  btnlegend: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginHorizontal: "auto",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 4,
  },
});
