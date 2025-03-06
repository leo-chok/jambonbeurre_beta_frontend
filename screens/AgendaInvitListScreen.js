import { use, useEffect, useState } from "react";
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

export default function AgendaInvitListScreen({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://10.1.0.166:3000/users/all')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setUsers(data.listUsers);
          })
          .catch(error => console.error('Erreur lors de la récupération des utilisateurs', error));
      }, []); 

    //----- Inviter un utilisateur à une reservation
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
            console.log(user),
            <TouchableOpacity key={user.id} style={styles.userItem}>
              <Text style={styles.userText}>{user.username}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noUsers}>Aucun utilisateur trouvé</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.goBackButton}
        title="Go Back"
        onPress={() => navigation.navigate("AgendaScreen")}
      >
        <Text style={styles.btnText}>Retour à l'agenda</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
                    style={styles.btnInvite}
                    onPress={() => inviteUser(reservation._id, user._id)}
                  >
                    <Text style={styles.btnText}>+ Invite</Text>
                  </TouchableOpacity> */}
    </KeyboardAvoidingView>
  );
}
// }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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
  },
  userItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#FF7F50",
    borderRadius: 10,
    alignItems: "center",
  },
  userText: {
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
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5DC",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    color: "#FF7F50",
  },
})
