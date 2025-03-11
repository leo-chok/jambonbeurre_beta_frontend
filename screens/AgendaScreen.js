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
import {
  TextInput,
  Modal,
  Button,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewReservation,
  deleteReservation,
  displayReservations,
} from "../reducers/reservations";
import { BACKEND_ADRESS } from "../.config";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Scroll } from "lucide-react";

export default function AgendaScreen({ navigation }) {
  const reservations = useSelector(
    (state) => state.reservations.value.reservations
  );
  const token = useSelector((state) => state.user.value.authentification.token);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  // //------------------- Permet de refresh les reservations après une action ------------------------
  // const refreshReservations = () => {
  //   fetch(BACKEND_ADRESS + `/reservations/${token}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.result) {
  //         dispatch(displayReservations(data.data));
  //       }
  //     });
  // };

  //------------------- Permet de récupérer les reservations ------------------------
  useEffect(() => {
    fetch(BACKEND_ADRESS + `/reservations/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(displayReservations(data.data));
          // refreshReservations();
          // Sépare les réservations en passées et futures
          const now = new Date();
          const future = data.data.filter(
            (reservation) => new Date(reservation.date) >= now
          );
          const past = data.data.filter(
            (reservation) => new Date(reservation.date) < now
          );
          setUpcomingReservations(future);
          setPastReservations(past);
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
  const leaveReservation = (reservationId, token) => {
    console.log("token:", token);
    if (!reservationId || !token) {
      console.error("Reservation ID or token is missing", {
        reservationId,
        token,
      });
      return;
    }

    console.log("Sending request with:", { reservationId, token });
    fetch(BACKEND_ADRESS + "/reservations/leaveReservation", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId, token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // dispatch(deleteReservation(reservationId, token));
          refreshReservations();
          console.log("Reservation quittée");
          return "Reservation quittée";
        } else {
          console.error(data.error);
        }
      });
  };

  //------------------- Formatage de la date ------------------------
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR"); // Formate en jj/mm/aaaa
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon Agenda 🗓️ </Text>
      </View>
      <Text style={styles.section}>
        {" "}
        Réservation prévues : {upcomingReservations.length}{" "}
      </Text>
      <ScrollView style={styles.scrollView}>
        {upcomingReservations.map((reservation) => (
          <View key={reservation._id} style={styles.reservationContainer}>
            <Text style={styles.textName}>{reservation.name}</Text>
            <Text style={styles.textDate}>{formatDate(reservation.date)}</Text>
            <Text style={styles.textConversation}>
              {reservation.conversation}
            </Text>
            <Button
              style={styles.btnInvite}
              mode={"contained"}
              onPress={() =>
                navigation.navigate("AgendaInvitListScreen", {
                  reservationId: reservation._id,
                })
              }
            >
              <AntDesign name="adduser" size={21} color="black" />
              <Text style={styles.title}> Inviter</Text>
            </Button>
            <Button
              style={styles.btnLeaveReservation}
              mode={"contained"}
              onPress={() => leaveReservation(reservation._id, token)}
            >
              <FontAwesome name="remove" size={20} color="black" />
              <Text style={styles.title}> Quitter</Text>
            </Button>
            {reservations.length === 0 && (
              <Text style={styles.noReserv}>Aucune réservation trouvée</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <Text style={styles.section2}>
        Réservation passées : {pastReservations.length}
      </Text>
      <ScrollView>
        {pastReservations.map((reservation) => (
          <View
            key={reservation._id}
            style={[styles.reservationContainerPast, { opacity: 0.7 }]}
          >
            <Text style={styles.textName}>{reservation.name}</Text>
            <Text style={styles.textDate}>{formatDate(reservation.date)}</Text>
          </View>
        ))}
      </ScrollView>
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
  },
  header: {
    width: "100%",
    backgroundColor: "#fcf4e9",
    padding: 30,
    alignItems: "center",
    borderBottomColor: "#ddd",
  },
  headerText: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(0, 108, 72)",
    fontFamily: "LeagueSpartan-SemiBold",
  },
  reservationContainer: {
    width: 330,
    height: 110,
    backgroundColor: "rgb(255, 218, 213)",
    borderRadius: 30,
    shadowColor: "#000",
    shadowRadius: 4,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  reservationContainerPast: {
    width: 330,
    height: 110,
    backgroundColor: "rgb(255, 218, 213)",
    borderRadius: 30,
    shadowColor: "#000",
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 35,
    paddingBottom: 10,
    paddingTop: 30,
  },
  btnAddReservation: {
    marginBottom: 120,
  },
  btnLeaveReservation: {
    marginTop: -40,
    marginLeft: "50%",
  },
  btnInvite: {
    marginLeft: -100,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "LeagueSpartan-SemiBold",
  },
  section: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "rgb(0, 108, 72)",
    fontFamily: "LeagueSpartan-SemiBold",
  },
  section2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    paddingTop: 10,
    color: "rgb(0, 108, 72)",
    fontFamily: "LeagueSpartan-SemiBold",
  },
  noReserv: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 70,
    color: "#888",
  },
});
