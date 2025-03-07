import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  TextInput,
  List,
  Text,
  Divider,
  Button,
  Switch,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

import Schedule from "../components/Schedule";
import foodType from "../assets/data/foodTypes";
import hobbiesList from "../assets/data/hobbiesList";
import languagesList from "../assets/data/languagesList";
import { BACKEND_ADRESS } from "../.config";

import { updateProfile } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileEditionScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [work, setWork] = useState("");
  const [bio, setBio] = useState("");
  const [favFood, setFavFood] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [vacancy, setVacancy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  // On récupère le lunchtime depuis le reducer car il est modifié dans le composant Schedule
  const lastLunchTime = useSelector(
    (state) => state.user.value.preferences.lunchtime
  );

  const onToggleSwitch = () => setVacancy(!vacancy);
  console.log(vacancy);

  // On vient récupérer les informations de l'utilisateur pour les afficher dans les champs
  useEffect(() => {
    // fetch user data
    fetch(BACKEND_ADRESS + "/users/" + token)
      .then((response) => response.json())
      .then((data) => {
        console.log("User found");
        setUserData(data.userInfos[0]);
      });
  }, []);

  // On vient actualiser tous les setters des que UserData est modifié
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setUsername(userData.infos.username);
      setFirstname(userData.infos.firstname);
      setLastname(userData.infos.lastname);
      setWork(userData.description.work);
      setBio(userData.description.bio);
      setFavFood(userData.preferences.favFood);
      setHobbies(userData.preferences.hobbies);
      setLanguages(userData.preferences.languages);
      setVacancy(userData.preferences.holidays);
    }
  }, [userData]);

  // On vient ajouter ou retirer un type de cuisine dans le tableau favFood
  function addTypeFood(type) {
    if (favFood.includes(type)) {
      setFavFood(favFood.filter((e) => e !== type));
    } else {
      setFavFood([...favFood, type]);
    }
  }
  // On vient ajouter ou retirer un hobby dans le tableau hobbies
  function addHobbies(type) {
    if (hobbies.includes(type)) {
      setHobbies(hobbies.filter((e) => e !== type));
    } else {
      setHobbies([...hobbies, type]);
    }
  }
  // On vient ajouter ou retirer une langue dans le tableau languages
  function addLanguages(type) {
    if (languages.includes(type)) {
      setLanguages(languages.filter((e) => e !== type));
    } else {
      setLanguages([...languages, type]);
    }
  }

  // On vient envoyer les données modifiées au reducer User & au backend (BDD)
  function handleSubmit() {
    setIsLoading(true);
    const dataReducer = {
      infos: {
        username: username,
        firstname: firstname,
        lastname: lastname,
      },
      description: {
        work: work,
        bio: bio,
      },
      preferences: {
        holidays: vacancy,
        lunchtime: lastLunchTime,
        favFood: favFood,
        hobbies: hobbies,
        languages: languages,
      },
    };

    const dataBDD = {
      token: token,
      username: username,
      firstname: firstname,
      lastname: lastname,
      work: work,
      bio: bio,
      holidays: vacancy,
      lunchtime: lastLunchTime,
      favFood: favFood,
      hobbies: hobbies,
      languages: languages,
    };

    // On envoie les données modifiées au reducer User
    dispatch(updateProfile(dataReducer));
    console.log("User updated in reducer");

    // On envoie les données modifiées au backend

    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated in BDD");
        console.log(data);
        setIsLoading(false);
        navigation.navigate("Profile");
      });
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.colors.background}] }
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Modifiez vos informations</Text>
      {!isLoading && (
        <ScrollView style={styles.inputs_container}>
          <Text style={styles.title}>Comment vous appelez vous ?</Text>
          <TextInput
            placeholder={username}
            label={"Pseudo"}
            value={username}
            onChangeText={(e) => setUsername(e)}
            style={styles.inputField}
          />
          <TextInput
            label="Nom"
            value={firstname}
            onChangeText={(firstname) => setFirstname(firstname)}
            style={styles.inputField}
          />
          <TextInput
            label="Prénom"
            value={lastname}
            onChangeText={(lastname) => setLastname(lastname)}
            style={styles.inputField}
          />
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Text style={styles.title}>Présentez vous ! </Text>
          <TextInput
            label="Métier / Etudes"
            value={work}
            onChangeText={(work) => setWork(work)}
            style={styles.inputField}
          />
          <TextInput
            label="Bio / Description"
            value={bio}
            onChangeText={(bio) => setBio(bio)}
            style={styles.inputField}
          />
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />

          <Text style={styles.title}>Indiquez vos disponibilités.</Text>
          <View style={styles.vacancesContainer}>
            <Text>Mode vacances</Text>
            <Switch value={vacancy} onValueChange={onToggleSwitch} />
          </View>
          {!vacancy && (
            <List.Accordion title="Créneaux Déjeuner" style={styles.inputList}>
              <Schedule data={userData?.preferences?.lunchtime} />
            </List.Accordion>
          )}

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Text style={styles.title}>Type de cuisine préférée</Text>
          <View style={styles.typeFoodContainer}>
            {foodType.map((type) => (
              <Button
                key={type}
                mode={(favFood.includes(type) && "contained") || "outlined"}
                onPress={() => addTypeFood(type)}
                style={styles.badgeButton}
              >
                <Text
                  style={[
                    styles.badgeButtonActive,
                    favFood.includes(type)
                      ? styles.badgeButtonActive
                      : styles.badgeButtonDisable,
                  ]}
                >
                  {type}
                </Text>
              </Button>
            ))}
          </View>

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Text style={styles.title}>Vos centre d'intérêts</Text>
          <View style={styles.hobbiesContainer}>
            {hobbiesList.map((type) => (
              <Button
                key={type}
                // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
                mode={(hobbies.includes(type) && "contained") || "outlined"}
                onPress={() => addHobbies(type)}
                style={styles.badgeButton}
              >
                <Text
                  style={[
                    styles.badgeButtonActive,
                    hobbies.includes(type)
                      ? styles.badgeButtonActive
                      : styles.badgeButtonDisable,
                  ]}
                >
                  {type}
                </Text>
              </Button>
            ))}
          </View>

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Text style={styles.title}>Do you speak English ?</Text>
          <View style={styles.hobbiesContainer}>
            {languagesList.map((type) => (
              <Button
                key={type}
                // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
                mode={(languages.includes(type) && "contained") || "outlined"}
                onPress={() => addLanguages(type)}
                style={styles.badgeButton}
              >
                <Text
                  style={[
                    styles.badgeButtonActive,
                    languages.includes(type)
                      ? styles.badgeButtonActive
                      : styles.badgeButtonDisable,
                  ]}
                >
                  {type}
                </Text>
              </Button>
            ))}
          </View>
        </ScrollView>
      )}
      {isLoading && (
        <ActivityIndicator size={120} animating={true} color={"white"} />
      )}
      <View style={styles.submitContainer}>
        <Button mode="contained" onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Submit</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
