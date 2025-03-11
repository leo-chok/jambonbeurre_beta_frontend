import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_ADRESS } from "../.config";

export default function MakeReservation({ restaurantId }) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Récupérer le token de l'utilisateur depuis Redux
  const userToken = useSelector((state) => state.user.value.authentification.token);


  console.log("user token ",userToken)

  const handleAddReservation = async () => {
    if (!userToken) {
      Alert.alert("Erreur", "Veuillez vous connecter pour réserver.");
      return;
    }

    setLoading(true);

    const reservationData = {
      id: userToken,
      name: "Réservation", // A remplacer par le nom de restaurant : comment ????
      date: date.toISOString(),
      // restaurants: restaurantId, // A remplacer par l'ID de restaurant : comment ????
    };

    try {
      const response = await fetch(`${BACKEND_ADRESS}/reservations/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (data.result) {
        Alert.alert("Succès", "Réservation ajoutée avec succès !");
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
          <Text style={styles.h2}>Choisissez une date</Text>

          {/* Date Picker */}
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>{date.toLocaleString()}</Text>
          </TouchableOpacity>

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
              <Text style={styles.bodytext}>Je réserve</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
    width: "100%",
    height: "48%",
    top: -50,
  },
  main: { alignItems: "center" },
  whitecard: {
    backgroundColor: "#fff",
    padding: 32,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    height: "100%",
  },
  reservation: { alignItems: "center", marginTop: 20 },
  h2: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: { fontSize: 16 },
  registerbtn: { marginTop: 10 },
  strokeborder: { padding: 10, backgroundColor: "#026C5D", borderRadius: 50 },
  bodytext: { marginTop: 5, fontSize: 16 },
});
