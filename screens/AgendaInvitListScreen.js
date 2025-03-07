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
import { BACKEND_ADRESS } from "../.config";
export default function AgendaInvitListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch(BACKEND_ADRESS + "/users/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Filtrer et trier les utilisateurs en fonction de leurs similitudes
        const filteredUsers = data.listUsers
          .map((user) => {
            let score = 0;
            //Vérifie les hobbies en communs
            if (
              user.preferences.hobbies.some((hobby) =>
                user.preferences.hobbies.includes(hobby)
              )
            ) {
              score += 1;
            }
            return { ...user, score }; //Ajoute le score à l'utilisateur
          })
          //   .filter((user) => user.score > 0) //Garder uniquement ceux qui ont des similitudes
          .sort((a, b) => b.score - a.score); //Trier par pertinence (score décroissant)
        setUsers(filteredUsers);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs", error)
      );
  }, []);

  //   //------------------ Inviter un utilisateur à une reservation
  //   const inviteUser = (reservationId, userId) => {
  //     fetch("http://10.1.0.166:3000/reservations/invite", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ reservationId, userId }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.result) {
  //           console.log("Utilisateur invité", data);
  //           return "Utilisateur invité";
  //         } else {
  //           console.error("Erreur lors de l'invitation:", data.error);
  //         }
  //       });
  //   };

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
              {/* Le bouton "Inviter" dans le même conteneur */}
              <Button
                style={styles.btnInvite}
                mode={"contained"}
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text style={styles.title}> + Inviter</Text>
              </Button>

              {/* Le bouton avec le nom d'utilisateur */}
              <Button
                style={styles.btnUsername}
                mode="text"  // Change mode to "text" for a link-like style
                onPress={() =>
                  navigation.navigate("ChatConversationScreen", { userId: user._id })
                }
              >
                <Text style={styles.userText}>{user.infos.username}</Text>
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
        onPress={() => navigation.navigate("AgendaScreen")}
      >
        <Text style={styles.btnText}>Retour à l'agenda</Text>
      </Button>
    
    </KeyboardAvoidingView>
  );
}
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5DC",
    alignItems: "center",
    justifyContent: "center",
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
  userList: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#f5f5DC",
  },
  userItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#FF7F50",
    borderRadius: 10,
    alignItems: "center",
  },
  userText: {
    marginTop: 15,
    color: "black",
    fontSize: 18,
  },
  noUsers: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#888",
  },
  goBackButton: {
    marginBottom: 50,
    padding: 15,
    backgroundColor: "#f5f5DC",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    color: "#FF7F50",
  },
  btnInvite: {
    marginRight: -220,
    marginTop: 10,
    borderRadius: 10,

  },
    btnUsername: {
        marginTop: -43,
    },
  avatar: {
    marginLeft: 90,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
