import { use, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { TextInput, Modal, Button, Portal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewReservation,
  deleteReservation,
  displayReservations,
} from "../reducers/reservations";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADRESS } from "../.config";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AgendaInvitListScreen({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const { reservationId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [inviteUser, setInviteUser] = useState();

  useEffect(() => {
    fetch(BACKEND_ADRESS + "/users/all")
      .then((response) => response.json())
      .then((data) => {
        //Filtrer et trier les utilisateurs en fonction de leurs similitudes
        const filteredUsers = data.listUsers
          .map((user) => {
            let score = 0;
            if (
              user.preferences.hobbies.some((hobby) => //Vérifie les hobbies en communs
                user.preferences.hobbies.includes(hobby)
              )
            ) {
              score += 1;
            }
            return { ...user, score }; //Ajoute le score à l'utilisateur
          })
          .filter((user) => user.score > 0) //Garder uniquement ceux qui ont des similitudes
          .sort((a, b) => b.score - a.score); //Trier par pertinence (score décroissant)
        setUsers(filteredUsers);
        if (filteredUsers.length === 0) {
          setUsers(data.listUsers); // Affiche tous les utilisateurs si aucun n'a de score
        } else {
          setUsers(filteredUsers);
        }
      });
  }, []);

  //------------------ Inviter un utilisateur à une reservation ------------------------
  const handleInviteUser = (reservationId, userId) => {
    if (!reservationId) {
      console.error("Aucune réservation trouvée");
      return;
    }
    fetch(BACKEND_ADRESS + "/reservations/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Utilisateur ajouté à la réservation");
          setInviteUser(userId);
          setModalVisible(true);
        } else {
          console.error("Erreur lors de l'invitation:", data.error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Mes Contacts</Text>
      </View>
      <ScrollView style={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <View key={user._id} style={styles.userItem}>
              <Image
                source={
                  user.infos.avatar
                    ? { uri: user.infos.avatar }
                    : require("../assets/logo/logoSeul.png")
                }
                style={styles.avatar}
              />
              <Portal>
<Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalStyle}>
  <View style={styles.modalContent}>
    <Text style={styles.modalText}> Utilisateur invité !
    </Text>
    <Button mode="contained" onPress={() => setModalVisible(false)}>
      OK
    </Button>
  </View>
</Modal>
</Portal>
              <Button
                style={styles.btnUsername}
                mode="text"
                onPress={() =>
                  navigation.navigate("ChatConversation", {
                    userId: user._id,
                  })
                }
              >
                <Text style={styles.userText}>{user.infos.username}</Text>
              </Button>
              <Button
                style={styles.btnInvite}
                mode={"contained"}
                onPress={() => handleInviteUser(reservationId, user._id)}
                >
                <AntDesign name="adduser" size={21} color="black" />
                <Text style={styles.title}></Text>
              </Button>
            </View>
          ))
        ) : (
          <Text style={styles.noUsers}>Aucun utilisateur trouvé</Text>
        )}
      </ScrollView>
      <Button
      style={styles.goBackButton}
      mode={"contained"}
      title="Go Back"
      onPress={() => navigation.navigate("Agenda")}
      >
        <Text style={styles.btnText}>Retour à l'agenda</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcf4e9",
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
  },
  userList: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fcf4e9",
  },
  userItem: {
    height: 80,
    paddingBottom: 20,
    marginVertical: 8,
    backgroundColor: "rgb(255, 218, 213)",
    borderRadius: 10,
    alignItems: "center",
  },
  userText: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: 200,
    textDecorationLine: "underline",
    fontFamily: "LeagueSpartan-SemiBold",
    color: "rgb(254, 87, 71)",
  },
  noUsers: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#888",
  },
  goBackButton: {
    flex: 1,
    marginTop: 170,
    padding: 20,
    backgroundColor: "#fcf4e9",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    marginTop: 29,
    color: "rgb(254, 87, 71)",
    fontFamily: "LeagueSpartan-SemiBold",
  },
  btnInvite: {
    flex: 1,
    marginLeft: "70%",
    borderRadius: 10,
  },
  btnUsername: {
    marginTop: -195,
    marginBottom: 50,
  },
  avatar: {
    marginRight: 245,
    width: 65,
    height: 65,
    borderRadius: 50,
    marginTop: 8,
    marginBottom: 10,
  },
  modalStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
  modalContent: {
    alignItems: "center",
    
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "rgb(0, 108, 72)"
  },
});
