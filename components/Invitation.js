import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_ADRESS } from "../.config";

// import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Invitation({ reservationId }) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.registerbtn}
        onPress={() =>
          navigation.navigate("AgendaInvitListScreen", {
            reservationId: reservation._id,
          })
        }
      >
        <View style={styles.strokeborder}>
          <Ionicons name="person-add-outline" size={32} color="#FFF" />
        </View>
      </TouchableOpacity>

      <Text style={styles.btnlegend}>Inviter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  registerbtn: {
    backgroundColor: "#FF6C47",
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  strokeborder: {
    backgroundColor: "#transparent",
    width: 64,
    height: 64,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFF",
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  btnlegend: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginHorizontal: "auto",
  },
});
