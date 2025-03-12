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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_ADRESS } from "../.config";
import Invitation from "../components/Invitation";

export default function MakeReservation(props) {

  let restaurantId = props.restaurantId;
  let restaurantName = props.restaurantName;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  // Récupérer le token de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.value);
  const userToken = user.authentification.token;
  const username = user.infos.username;
  const avatar = user.infos.avatar;

  console.log(userToken);

  const handleAddReservation = async () => {
    if (!userToken) {
      Alert.alert("Erreur", "Veuillez vous connecter pour réserver.");
      return;
    }

    setLoading(true);

    const reservationData = {
      name: restaurantName, 
      token: userToken,
      date: date.toISOString(),
      restaurantId: restaurantId,
    };

    try {
      const response = await fetch(`${BACKEND_ADRESS}/reservations/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (data.result) {
        Alert.alert("Tu es bien inscrit !");
        setReservationConfirmed(true);
      } else {
        Alert.alert(
          "Erreur",
          data.error || "Impossible d'ajouter la réservation."
        );
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={[styles.whitecard, styles.reservation]}>
          <View>
            {reservationConfirmed ? (
              <Text style={styles.h2}>Tu es bien inscrit !</Text>
            ) : (
              <Text style={styles.h2}>Choisis le créneau de ton choix :</Text>
            )}
          </View>

          <View>
            {reservationConfirmed ? (
              <View></View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.dateButton}
              >
                <Text style={styles.dateText}>{date.toLocaleString()}</Text>
              </TouchableOpacity>
            )}
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <View style={styles.gallery}>
            {reservationConfirmed ? (
              <View style={styles.row}>
                <View>
                  <Image
                    style={styles.avatar}
                    source={avatar && { uri: `${avatar}` }}
                  />
                  <Text style={styles.btnlegend}>
                    {reservationConfirmed ? username : "Je réserve"}
                  </Text>
                </View>
                {/* <Invitation></Invitation> */}
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.registerbtn}
                  onPress={handleAddReservation}
                  disabled={loading}
                >
                  <View style={styles.strokeborder}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Ionicons name="add-outline" size={32} color="#FFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.btnlegend}>
                  {reservationConfirmed ? username : "Je réserve"}
                </Text>
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
    marginTop: 16,
    position: "relative",
    width: "100%",
    top: -32,
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
  },
  reservation: {
    alignItems: "center",
    marginTop: 20,
  },
  h2: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },

  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  dateText: { fontSize: 16 },
  registerbtn: {
    backgroundColor: "#FF6C47",
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
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
  row: {
    flexDirection: "row",
    gap: 24,
  },
});
