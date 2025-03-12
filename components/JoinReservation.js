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

  const user = useSelector((state) => state.user.value);
  const [reservationData, setReservationData] = React.useState(null);

  const [isReserved, setIsReserved] = useState(false);

  // Récupérer les réservations
  useEffect(() => {
    getRestaurantReservation();
  }, [restaurantId]);

  //fonction fecth res

  const getRestaurantReservation = () => {
    fetch(`${BACKEND_ADRESS}/reservations/restaurant/${restaurantId}`)
      .then((response) => response.json())
      .then((data) => {
        setReservationData(data);

        if (data?.data?.[0]?.users) {
          setIsReserved(true);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des réservations", error)
      );
  };

  // Vérifier que reservationData est bien chargé avant d'accéder aux valeurs
  if (!reservationData) {
    return null;
  }

  // Infos des utilisateurs inscrits
  const registeredUsers =
    reservationData.data?.[0]?.users?.map((user) => user.infos.username) || [];
  const registeredAvatar =
    reservationData.data?.[0]?.users?.map((user) => user.infos.avatar) || [];
  const reservationDataId = reservationData.data?.[0]?._id;
  const userToken = user.authentification.token;

  const joinReservationConfirmed = registeredUsers?.includes(
    user.infos.username
  );

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

      if (data?.result || data?.error === "Utilisateur déjà invité") {
        getRestaurantReservation();
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

  // Fonction pour formater la date de la réservation au format souhaité
  let reservationDate = reservationData.data?.[0].date;
  const formatDate = (dateString) => {
    const jours = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const date = new Date(dateString);

    const jourSemaine = jours[date.getUTCDay()];
    const jour = date.getUTCDate();
    const moisNom = mois[date.getUTCMonth()];
    const heures = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${jourSemaine} ${jour} ${moisNom} - ${heures}h${minutes}`;
  };

  return (
    <View style={styles.container}>
      {reservationData.result ? (
        <View>
          <View style={styles.whitecard}>
            <Text style={styles.h2}>{formatDate(reservationDate)}</Text>
            <View style={styles.gallery}>
              {!joinReservationConfirmed && (
                <View>
                  <TouchableOpacity
                    style={styles.registerbtn}
                    onPress={handlejoin}
                  >
                    <View style={styles.strokeborder}>
                      <Ionicons name="add-outline" size={32} color="#FFF" />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.btnlegend}>Je m'inscrit</Text>
                </View>
              )}
              {isReserved && (
                <View style={styles.registeredusers}>
                  {registeredUsers.map((user, index) => (
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
        <MakeReservation
          restaurantId={restaurantId}
          restaurantName={restaurantName}
        />
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
