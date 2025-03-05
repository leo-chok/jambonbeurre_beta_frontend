import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
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
    (state) => state.reservations.value.reservations);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [date, setDate] = useState("");
  const [conversation, setConversation] = useState("");
  const [reservation, setReservation] = useState("");
  // console.log("Nom:", name);
  // console.log("Token:", token);
  // console.log("Date:", date);
  // console.log("Conversation:", conversation);

  useEffect(() => {
    const token = "t1HwP0cTMuMK3IGu4DRXzQqf4XToT_EO";
    fetch(`http://10.1.0.166:3000/reservations/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(displayReservations(data.data));
        }
      });
  }, [token, dispatch]);

  //Ajouter une reservation
  const handleAddReservation = () => {
    fetch("http://10.1.0.166:3000/reservations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, token, date, conversation }),
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
// FUNCTION RETIRER RESERVATION
  const handleDeleteReservation = (reservationId) => {
    fetch("http://10.1.0.166:3000/reservations/deleteUser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteReservation(reservationId));
        } else {
          console.error(data.error);
        }
      });
  };
  console.log(reservations);
  const display = reservations.map((reservation) => {
    return (
      <View key={reservation._id}>
        <Text style={styles.textName}>{reservation.name}</Text>
        <Text style={styles.textDate}>{reservation.date} {formatDate(reservation.date)}</Text>
        <Text style={styles.textConversation}>{reservation.conversation}</Text>
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => handleDeleteReservation(reservation)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {display}

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
  },
  btnAddReservation: {
    width: "30%",
    height: "5%",
    alignItems: "center",
    paddingTop: 8,
    borderRadius: 10,
    backgroundColor: "red",
  },
  btnDelete: {
    width: "60%",
    height: "20%",
    paddingTop: 8,
    borderRadius: 10,
    alignItems: "center",
backgroundColor: 'green',
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
