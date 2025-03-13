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
  List,
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

export default function AgendaPastScreen({ navigation }) {
  const reservations = useSelector(
    (state) => state.reservations.value.reservations
  );
  const token = useSelector((state) => state.user.value.authentification.token);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

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
          // Vérifie si les nouvelles données sont différentes des anciennes
          if (JSON.stringify(reservations) !== JSON.stringify(data.data)) {
            dispatch(displayReservations(data.data));
          }
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
  }, [reservations, pastReservations, upcomingReservations]);
  //------------------- Ajouter une reservation ------------------------
  // const handleAddReservation = () => {
  //   fetch(BACKEND_ADRESS + "/reservations/add", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       restaurantId,
  //       userId: user._id,
  //       date,
  //       conversationId,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result) {
  //         dispatch(addNewReservation(data.reservation));
  //         refreshReservations();
  //       } else {
  //         console.error("Erreur d'ajout de la réservation", data.error);
  //       }
  //     });
  // };
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
          dispatch(deleteReservation(reservationId, token));
          refreshReservations();
        } else {
          console.error(data.error);
        }
      });
  };
  //------------------- Formatage de la date ------------------------
  const formatDate = (date) => {
    return (
      new Date(date).toLocaleDateString("fr-FR") +
      " - " +
      new Date(date).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ); // Formate en jj/mm/aaaa
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon Agenda 🗓️ </Text>
      </View>
      <View style={{ flex: 1, width: "100%", paddingBottom: 60 }}>
        <Text style={styles.section2}>
          Réservation(s) passée(s) : {pastReservations.length}
        </Text>
        <ScrollView style={styles.scrollView2}>
          {pastReservations.map((reservation) => (
            <View
              key={reservation._id}
              style={[styles.reservationContainerPast, { opacity: 0.7 }]}
            >
              <Text style={styles.textName}>{reservation.name}</Text>
              <Text style={styles.textDate}>
                {formatDate(reservation.date)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
            <View style={styles.past}>
            <Button mode="outlined" onPress={() => navigation.navigate("Agenda")}>
                  <Text style={{ color: "#fe5747", fontSize: 18, }}>Réservations Prévues</Text>
                </Button>
            </View>
      <Button
        style={styles.btnAddReservation}
        mode={"contained"}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.newReservation}>
          <AntDesign name="pluscircleo" size={20} color="white" />
        </Text>
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  header: {
    width: "100%",
    backgroundColor: "#fcf4e9",
    padding: 30,
    alignItems: "center",
    borderBottomColor: "#ddd",
  },
  headerText: {
    marginTop: 40,
    fontSize: 30,
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
  },
  reservationContainerPast: {
    width: 330,
    height: 70,
    backgroundColor: "rgb(255, 218, 213)",
    borderRadius: 30,
    shadowColor: "#000",
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
    padding: 18,
    marginHorizontal: "auto",
  },
  btnAddReservation: {
    position: "absolute",
    bottom: 100,
    right: 30,
    height: 63,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLeaveReservation: {
    marginTop: -41,
    marginLeft: "45%",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  btnInvite: {
    marginRight: "45%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // buttonText: {
  //   color: "white",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(78, 68, 75))",
    fontFamily: "LeagueSpartan-SemiBold",
  },
  section: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#397a5b",
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
  },
  section2: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 5,
    color: "#397a5b",
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,

  },
  noReserv: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 70,
    color: "#888",
  },
  newReservation: {
    color: "white",
    marginHorizontal: "auto",
    marginVertical: "auto",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  scrollView2: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  past : {
    position: "absolute",
    bottom: 110,
    left: 30,
    flexDirection: "row",
  },
});
