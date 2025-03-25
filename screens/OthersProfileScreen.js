import { useEffect, useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Text, Divider, Button, useTheme } from "react-native-paper";

import { BACKEND_ADRESS } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

export default function OthersProfileScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [work, setWork] = useState("");
  const [bio, setBio] = useState("");
  const [favFood, setFavFood] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [vacancy, setVacancy] = useState(false);
  const theme = useTheme();

  // On récupère le lunchtime depuis le reducer car il est modifié dans le composant Schedule
  const lastLunchTime = useSelector(
    (state) => state.user.value.preferences.lunchtime
  );

  // On vient récupérer les informations de l'utilisateur pour les afficher dans les champs
  useEffect(() => {
    // fetch user data
    fetch(BACKEND_ADRESS + "/users/other/" + route.params.userId)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userInfos);
      });
  }, [isFocused]);

  // On vient actualiser tous les setters des que UserData est modifié
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setUsername(userData.infos.username);
      setFirstname(userData.infos.firstname);
      setLastname(userData.infos.lastname);
      setAvatar(userData.infos.avatar);
      setWork(userData.description.work);
      setBio(userData.description.bio);
      setFavFood(userData.preferences.favFood);
      setHobbies(userData.preferences.hobbies);
      setLanguages(userData.preferences.languages);
      setVacancy(userData.preferences.holidays);
    }
  }, [userData]);

  const displayCreneaux = lastLunchTime.map((data, i) => {
    return (
      <View key={i} style={styles.creneauxContainer}>
        <View style={styles.creneauxLigne}>
          <Text style={styles.creneauxText}>{data.name}</Text>
          {data.worked ? (
            <View style={styles.creneauxLigne}>
              <Text style={styles.creneauxText}>{data.start} à </Text>
              <Text style={styles.creneauxText}>{data.stop}</Text>
            </View>
          ) : (
            <View style={styles.creneauxLigne}>
              <Text style={styles.creneauxText}>Indisponible</Text>
            </View>
          )}
        </View>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topContainer}>
        <Text style={styles.mainTitle}>{username}</Text>
      </View>
      <TouchableOpacity style={styles.avatarContainer}>
        <Image style={styles.avatar} source={avatar && { uri: `${avatar}` }} />
      </TouchableOpacity>
      <ScrollView style={styles.inputs_container}>
        <Text style={styles.title}>Mes informations</Text>
        <View style={styles.infos_container}>
          <Text style={styles.infos_title}>Pseudo</Text>
          <Text style={styles.infos_data}>{username}</Text>
        </View>
        <View style={styles.infos_container}>
          <Text style={styles.infos_title}>Prénom</Text>
          <Text style={styles.infos_data}>{firstname}</Text>
        </View>
        <View style={styles.infos_container}>
          <Text style={styles.infos_title}>Nom</Text>
          <Text style={styles.infos_data}>{lastname}</Text>
        </View>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Un peu plus sur moi</Text>
        <View style={styles.infos_container}>
          <Text style={styles.infos_title}>Mon travail / Mes études</Text>
          <Text style={styles.infos_data}>{work}</Text>
        </View>
        <View style={styles.infos_container}>
          <Text style={styles.infos_title}>Ma bio</Text>
          <Text style={styles.infos_data}>{bio}</Text>
        </View>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <Text style={styles.title}>Mes créneaux pour déjeuner</Text>
        <View style={styles.vacancesContainer}>
          {vacancy && <Text>En vacances</Text>}
        </View>
        <View style={styles.mainCreneaux}>{!vacancy && displayCreneaux}</View>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Types de cuisine préférés</Text>
        <View style={styles.typeFoodContainer}>
          {favFood.length === 0 ? (
            <Text style={styles.noInfos}>
              Aucun type de cuisine sélectionné
            </Text>
          ) : (
            favFood.map((type) => (
              <Button key={type} mode={"contained"} style={styles.badgeButton}>
                <Text style={styles.badgeButtonActive}>{type}</Text>
              </Button>
            ))
          )}
        </View>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Mes centres d'intérêts</Text>
        <View style={styles.hobbiesContainer}>
          {hobbies.length === 0 ? (
            <Text style={styles.noInfos}>
              Aucun centre d'intérêt sélectionné
            </Text>
          ) : (
            hobbies.map((type) => (
              <Button
                key={type}
                // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
                mode={"contained"}
                style={styles.badgeButton}
              >
                <Text style={styles.badgeButtonActive}>{type}</Text>
              </Button>
            ))
          )}
        </View>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Mes langues</Text>
        <View style={styles.languageContainer}>
          {languages.length === 0 ? (
            <Text style={styles.noInfos}>Aucune langue sélectionnée</Text>
          ) : (
            languages.map((type) => (
              <Button
                key={type}
                // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
                mode={"contained"}
                style={styles.badgeButton}
              >
                <Text style={styles.badgeButtonActive}>{type}</Text>
              </Button>
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    marginBottom: 20,
  },
  avatarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    textAlign: "center",
    marginTop: 25,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 25,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",
    marginBottom: 10,
  },
  infos_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
  },
  infos_title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    width: "40%",
    fontFamily: "Montserrat-Medium",
  },
  infos_data: {
    fontSize: 15,
    fontWeight: 300,
    fontFamily: "Montserrat-Medium",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "right",
    width: "60%",
  },
  noInfos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 300,
    width: "100%",
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
  },
  inputs_container: {
    width: "80%",
    gap: 20,
  },
  inputField: {
    marginTop: 10,
    width: "100%",
  },
  mainCreneaux: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    fontFamily: "Montserrat-Medium",
  },
  vacancesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  creneauxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    fontFamily: "Montserrat-Medium",
  },
  creneauxLigne: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Montserrat-Medium",
  },
  creneauxText: {
    fontFamily: "Montserrat-Medium",
  },
  inputList: {
    marginTop: 10,
    width: "100%",
  },
  checkBox: {
    width: 30,
    height: 30,
  },
  dayItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  typeFoodContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    fontFamily: "Montserrat-Medium",
  },
  hobbiesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    fontFamily: "Montserrat-Medium",
  },
  languageContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: "Montserrat-Medium",
  },
  submitContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  },
  badgeButton: {
    width: "40%",
  },
  badgeButtonActive: {
    color: "white",
  },
  badgeButtonDisable: {
    color: "black",
  },
});
