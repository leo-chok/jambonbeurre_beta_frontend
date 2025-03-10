import { use, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, Modal, Button, Portal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewReservation,
  deleteReservation,
  displayReservations,
} from "../reducers/reservations";
import { BACKEND_ADRESS } from "../.config";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AgendaScreen({ navigation }) {
  const reservations = useSelector(
    (state) => state.reservations.value.reservations
  );
  const dispatch = useDispatch();
  const user = { _id: "67cc823e7a93dd8322170c4f" };
  const token = "3XlSzQIc6xMoLXvDILbLu_MJBchj5n5e";

  //------------------- Permet de refresh les reservations après une action ------------------------
  const refreshReservations = () => {
    fetch(BACKEND_ADRESS + `/reservations/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(displayReservations(data.data));
        }
      });
  };

  //------------------- Permet de récupérer les reservations ------------------------
  useEffect(() => {
    fetch(BACKEND_ADRESS + `/reservations/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(displayReservations(data.data));
          refreshReservations()
        }
      });
  }, []);

  //------------------- Ajouter une reservation ------------------------
  const handleAddReservation = () => {
    fetch(BACKEND_ADRESS + "/reservations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        userId: user._id,
        date,
        conversationId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addNewReservation(data.reservation));
          refreshReservations();
        } else {
          console.error("Erreur d'ajout de la réservation", data.error);
        }
      });
  };

  //------------------- Quitter une reservation ------------------------
  const leaveReservation = (reservationId, userId) => {
    fetch(BACKEND_ADRESS + "/reservations/leaveReservation", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteReservation(reservationId, userId));
          refreshReservations();
          console.log("Reservation quittée");
          return "Reservation quittée";
        } else {
          console.error(data.error);
        }
      });
  };
  //------------------- Supprimer une reservation ------------------------
  // const handleDeleteReservation = (reservationId) => {
  //   fetch(BACKEND_ADRESS + "/reservations/deleteUser", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ reservationId }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.result) {
  //         dispatch(deleteReservation(reservationId));
  //         return "Reservation supprimée";
  //       } else {
  //         console.error(data.error);
  //       }
  //     });
  // };

 
  // //------------------- Formatage de la date
  // const formatDate = (date) => {
  //   return new Date(date).toLocaleDateString("fr-FR"); // Formate en jj/mm/aaaa
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon Agenda</Text>
      </View>
      <Text style={styles.section}> Réservation prévues : {reservations.length}</Text>
      <ScrollView style={styles.scrollView}>
        {reservations.map((reservation) => (
          <View key={reservation._id} style={styles.reservationContainer}>
            <Text style={styles.textName}>{reservation.name}</Text>
            <Text style={styles.textDate}>{reservation.date}</Text>
            <Text style={styles.textConversation}>
              {reservation.conversation}
            </Text>
            {/* <Button
              style={styles.btnDelete}
              mode={"contained"}
              onPress={() => handleDeleteReservation(reservation._id)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </Button> */}
            <Button
              style={styles.btnInvite}
              mode={"contained"}
              onPress={() => navigation.navigate("AgendaInvitListScreen", { reservationId: reservation._id })}
            >
              <AntDesign name="adduser" size={21} color="black" />
              <Text style={styles.title} > Inviter</Text>
            </Button>
            <Button
              style={styles.btnLeaveReservation}
              mode={"contained"}
              onPress={() => leaveReservation(reservation._id, user._id)}
            >
              <FontAwesome name="remove" size={24} color="black" />
              <Text style={styles.title}  > Quitter</Text>
            </Button>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.section2}> Réservation passées : </Text>
      <Button
        style={styles.btnAddReservation}
        mode={"contained"}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.title}>Nouvelle Reservation ?</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5DC",
  },
  header: {
    width: "100%",
    backgroundColor: "#f5f5DC",
    padding: 30,
    alignItems: "center",
    borderBottomColor: "#ddd",
  },
  headerText: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F50",
  },
  reservationContainer: {
    width: 330,
    height: 110,
    backgroundColor: "#FCD2DE",
    borderRadius: 30,
    shadowColor: "#000",
    shadowRadius: 4,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    paddingBottom: 10,
  },
  btnAddReservation: {
    marginBottom: 120,
  },
  btnDelete: {},
  btnLeaveReservation: {
    marginTop: -40,
    marginRight: 120,
  },
  btnInvite: {
    marginLeft: 150,

  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 18,
  },
  section2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 170,
  },
});
