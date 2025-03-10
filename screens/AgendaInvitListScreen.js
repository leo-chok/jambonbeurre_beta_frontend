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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BACKEND_ADRESS } from "../.config";


export default function AgendaInvitListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const reservationId = route.params?.reservationId; // Récupère l'ID de la réservation

  useEffect(() => {
    fetch(BACKEND_ADRESS + "/users/all")
      .then((response) => response.json())
      .then((data) => {
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

    //------------------ Inviter un utilisateur à une reservation
     const handleInviteUser = (userId) => {
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
             refreshReservations()
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
                <Image source={{ uri: user.infos.avatar }} style={styles.avatar} />

             
              <Button
                style={styles.btnUsername}
                mode="text" 
                onPress={() =>
                  navigation.navigate("ChatConversationScreen", { userId: user._id })
                }
              >
                <Text style={styles.userText}>{user.infos.username}</Text>
              </Button>
              <Button
                style={styles.btnInvite}
                mode={"contained"}
                onPress={() => handleInviteUser(user._id)}
              >
                <Text style={styles.title}> + Inviter</Text>
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
    marginTop: 30,
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
    marginTop: 40,
    marginLeft: 30,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: 200,
    textAlign: "center",
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
        marginTop: -195,
        marginBottom: 50,
    },
  avatar: {
    marginLeft: -250,
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: -5,
    marginBottom: 10,
  },
});
