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

import {
  TextInput,
  List,
  RadioButton,
  Checkbox,
  Text,
  Divider,
  Button,
  Switch,
  Chip,
} from "react-native-paper";

import { BACKEND_ADRESS } from "../.config";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
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

  // On récupère le lunchtime depuis le reducer car il est modifié dans le composant Schedule
  const lastLunchTime = useSelector(
    (state) => state.user.value.preferences.lunchtime
  );

  // On vient récupérer les informations de l'utilisateur pour les afficher dans les champs
  useEffect(() => {
    // fetch user data
    fetch(BACKEND_ADRESS + "/users/" + token)
      .then((response) => response.json())
      .then((data) => {
        console.log("User found");
        setUserData(data.userInfos[0]);
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

  const handleEditProfile = () => {
    navigation.navigate("ProfileEdition");
  };

  const handleEditAvatar = () => {
    navigation.navigate("Camera");
  };

  const displayCreneaux = lastLunchTime.map((data, i) => {
    return (
      <View key={i} style={styles.creneauxContainer}>
        <View style={styles.creneauxLigne}>
          <Text>{data.name}</Text>
          {data.worked ? (
            <View style={styles.creneauxLigne}>
              <Text>{data.start} à </Text>
              <Text>{data.stop}</Text>
            </View>
          ) : (
            <View style={styles.creneauxLigne}>
              <Text>Indisponible </Text>
            </View>
          )}
        </View>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.textButton} onPress={() => handleEditProfile()}>
          Modifier
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleEditAvatar()}
        style={styles.avatarContainer}
      >
        <Image style={styles.avatar} source={avatar && { uri: `${avatar}` }} />
      </TouchableOpacity>
      <ScrollView style={styles.inputs_container}>
        <Text style={styles.title}>Mes informations:</Text>
        <Text style={styles.infos_title}>Pseudo</Text>
        <Text style={styles.infos_data}>{username}</Text>
        <Text style={styles.infos_title}>Nom</Text>
        <Text style={styles.infos_data}>{firstname}</Text>
        <Text style={styles.infos_title}>Prénom</Text>
        <Text style={styles.infos_data}>{lastname}</Text>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Un peu plus sur moi:</Text>
        <Text style={styles.infos_title}>Mon travail / Mes études :</Text>
        <Text style={styles.infos_data}>{work}</Text>
        <Text style={styles.infos_title}>Ma bio :</Text>
        <Text style={styles.infos_data}>{bio}</Text>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <Text style={styles.title}>Mes créneaux pour déjeuner</Text>
        <View style={styles.vacancesContainer}>
          {vacancy && <Text>En vacances</Text>}
        </View>
        {!vacancy && displayCreneaux}
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Type de cuisine préférée</Text>
        <View style={styles.typeFoodContainer}>
          {favFood.map((type) => (
            <Button key={type} mode={"contained"} style={styles.badgeButton}>
              <Text style={styles.badgeButtonActive}>{type}</Text>
            </Button>
          ))}
        </View>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Vos centre d'intérêts</Text>
        <View style={styles.hobbiesContainer}>
          {hobbies.map((type) => (
            <Button
              key={type}
              // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>{type}</Text>
            </Button>
          ))}
        </View>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Mes langues</Text>
        <View style={styles.hobbiesContainer}>
          {languages.map((type) => (
            <Button
              key={type}
              // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
              mode={"contained"}
              style={styles.badgeButton}
            >
              <Text style={styles.badgeButtonActive}>{type}</Text>
            </Button>
          ))}
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
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infos_title: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },
  infos_data: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 300,
    width: "100%",
    textAlign: "right",
    marginBottom: 10,
  },
  inputs_container: {
    width: "80%",
    gap: 20,
  },
  inputField: {
    marginTop: 10,
    width: "100%",
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
    width: "100%",
  },
  creneauxLigne: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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
  },
  hobbiesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    marginBottom: 50,
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
