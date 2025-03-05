import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewReservation,
  deleteReservation,
  displayReservations,
} from "../reducers/reservations";

export default function AgendaScreen({ navigation }) {
  const reservations = useSelector(
    (state) => state.reservations.value.reservations
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [date, setDate] = useState("");
  const [conversation, setConversation] = useState("");
  const [reservation, setReservation] = useState("");

  const user = { _id: "67c8328fd39cf888fb710f59" };
  useEffect(() => {
    const token = "KiXwiK-Q1n7JJVyzcbeGKUJ_fJ3CJltk";
    fetch(`http://10.1.0.166:3000/reservations/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(displayReservations(data.data));
        }
      });
  }, []);

  //------- Ajouter une reservation
  const handleAddReservation = () => {
    fetch("http://10.1.0.166:3000/reservations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurantId, userId: user._id, date }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addNewReservation(data.reservation));
        } else {
          console.error("Erreur d'ajout de la réservation", data.error);
        }
      });
  };

  //------ Quitter une reservation
  const leaveReservation = (reservationId, userId) => {
    fetch("http://10.1.0.166:3000/reservations/leaveReservation", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteReservation(reservationId, userId));
          console.log("Reservation quittée");
          return "Reservation quittée";
        } else {
          console.error(data.error);
        }
      });
  };
  //------ Supprimer une reservation
  const handleDeleteReservation = (reservationId) => {
    fetch("http://10.1.0.166:3000/reservations/deleteUser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(deleteReservation(reservationId));
          return "Reservation supprimée";
        } else {
          console.error(data.error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        {reservations.map((reservation) => (
          <View key={reservation._id} style={styles.reservationContainer}>
            <Text style={styles.textName}>{reservation.name}</Text>
            <Text style={styles.textDate}>{reservation.date}</Text>
            <Text style={styles.textConversation}>
              {reservation.conversation}
            </Text>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => handleDeleteReservation(reservation._id)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnLeaveReservation}
              onPress={() => leaveReservation(reservation._id, user._id)}
            >
              <Text style={styles.title}>Leave</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.btnAddReservation}
        onPress={() => handleAddReservation()}
      >
        <Text style={styles.title}>Add</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  reservationContainer: {
    width: 250,
    backgroundColor: "pink",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 20,
  },
  btnAddReservation: {
    width: 70,
    height: 30,
    alignItems: "center",
    paddingTop: 8,
    borderRadius: 10,
    backgroundColor: "red",
    marginBottom: "20%",
  },
  btnDelete: {
    width: 70,
    height: 30,
    paddingTop: 8,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "green",
    marginLeft: 90,
  },
  btnLeaveReservation: {
    width: 70,
    height: 30,
    paddingTop: 8,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "orange",
  marginRight: 90,
  marginTop: -30,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
