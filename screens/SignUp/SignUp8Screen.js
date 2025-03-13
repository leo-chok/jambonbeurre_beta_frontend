import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken, updateProfile } from "../../reducers/user";
import { BACKEND_ADRESS } from "../../.config";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  Text,
  Divider,
  Button,
  useTheme,
} from "react-native-paper";

import foodType from "../../assets/data/foodTypes";
import hobbiesList from "../../assets/data/hobbiesList";
import languagesList from "../../assets/data/languagesList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp8Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const userReducer = useSelector((state) => state.user.value);
  const theme = useTheme();
  const [favFood, setFavFood] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ----- FUNCTIONS ------------------------------

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

    // Bouton suivant
  const handleSuivant = () => {
    setIsLoading(true);
    const dataReducer = {
      preferences: {
        favFood: favFood,
        hobbies: hobbies,
        languages: languages,
      },
    };

    // On envoie les données modifiées au reducer User
    dispatch(updateProfile(dataReducer));

    // On envoie les données modifiées à la BDD
    const dataBDD = {
      token: token,
      favFood: favFood,
      hobbies: hobbies,
      languages: languages,
    };
    fetch(BACKEND_ADRESS + "/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBDD),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        navigation.navigate("SignUp9");
      });
  };

    // Bouton ignorer
  const handleIgnore = () => {
    navigation.navigate("SignUp9");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.main}>
        <Text style={styles.mainTitle}>Ton profil 🧑‍💻</Text>
        <Text style={styles.text}>
          Dernière étape ! {"\n"}Aide-nous à te trouver le buddy idéal !
        </Text>
        <ScrollView style={styles.inputs_container}>
          <Text style={styles.title}>Type de cuisine préféré</Text>
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
          <Text style={styles.title}>Tes centres d'intérêts</Text>
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
          <Text style={styles.title}>Quelles langues parles-tu ?</Text>
          <View style={styles.languageContainer}>
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
        <Button
          onPress={() => handleSuivant()}
          mode={"contained"}
          style={styles.Button}
        >
          <Text style={styles.Active}>Suivant</Text>
        </Button>
        <Button
          onPress={() => handleIgnore()}
          mode={"outlined"}
          style={styles.Button}
        >
          <Text style={styles.ignoreButtonActive}>Ignorer</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fe5747",
    fontFamily: "LeagueSpartan-Bold",
    alignText: "center",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 25,
    fontFamily: "LeagueSpartan-SemiBold",
    letterSpacing: -1,
    color: "#397a5b",
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  Button: {
    width: 250,
    marginTop: 16,
    marginHorizontal: "auto",
  },
  Active: {
    color: "white",
    fontSize: 20,
  },
  badgeButton: {
    width: "40%",
  },
  badgeButtonActive: {
    color: "white",
  },
  ignoreButtonActive: {
    color: "#fe5747",
    fontSize: 20,
  },
  badgeButtonDisable: {
    color: "black",
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
  },
  inputs_container: {
    width: "80%",
    gap: 16,
  },
});
