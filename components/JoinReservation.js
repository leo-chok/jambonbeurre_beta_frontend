import React, { useState, useEffect } from "react";
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

import { Ionicons } from "@expo/vector-icons"; // Importer les icônes
import { BACKEND_ADRESS } from "../.config";
import MakeReservation from "../components/MakeReservation";

export default function JoinReservation(props) {

  let restaurantId = props.restaurantId;
  let restaurantName = props.restaurantName;

  restaurantName
  const user = useSelector((state) => state.user.value);
  const [reservationData, setReservationData] = React.useState(null);

  // Récupérer les réservations
  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/reservations/restaurant/${restaurantId}`)
      .then((response) => response.json())
      .then((data) => setReservationData(data))

      .catch((error) =>
        console.error("Erreur lors de la récupération des réservations", error)
      );
  }, [restaurantId]);

  // Quitter si pas de réservation existante
  if (!reservationData) {
    return;
  }

  // let reservationDataName = reservationData[0]?.name;

  console.log("START JSON HERE :", JSON.stringify(reservationData, null, 2))



  // Si réservation existante, récupérer les infos des utilisateurs inscrits au déjeuner du restaurant sélectionné
  let registeredUsers = reservationData.data?.[0].users.map(
    (user) => user.infos.username
  );
  let registeredAvatar = reservationData.data?.[0].users.map(
    (user) => user.infos.avatar
  );
  const username = user.infos.username;
  const joinReservationConfirmed = registeredUsers?.includes(username);

  let reservationDataId = reservationData[0]?._id;

  // Infos de l'utilisateur connecté (token, name et photo de profil)
  const userToken = user.authentification.token;

  // Vérifier si une réservation existante est créée
  const isReserved = registeredUsers?.length != 0;

  // Fonction pour rejoindre une réservation
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
        Alert.alert(
          "Erreur",
          data.error || "Impossible de rejoindre la réservation."
        );
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {reservationData.result ? (
        <View>
          <View style={styles.whitecard}>
            {joinReservationConfirmed ? (
              <Text style={styles.h2}>Tu es bien inscrit !</Text>
            ) : (
              <Text style={styles.h2}>Inscrit-toi !</Text>
            )}
            <View style={styles.gallery}>
              {!joinReservationConfirmed && (
                <View style={styles.gallery}>
                  <View>
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
              {isReserved && (
                <View style={styles.registeredusers}>
                  {registeredUsers?.map((user, index) => (
                    <View key={index}>
                      <Image
                        style={styles.avatar}
                        source={{ uri: registeredAvatar[index] }}
                      />
                      <Text style={styles.btnlegend}>{user}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <MakeReservation restaurantId={restaurantId} restaurantName={restaurantName}></MakeReservation>
      )}
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
    marginHorizontal: "auto",
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
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "center",
  },
  registeredusers: {
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
    marginHorizontal: "auto",
  },
});
