import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken, updateProfile } from "../../reducers/user";
import { BACKEND_ADRESS } from "../../.config";
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
  Snackbar,
  useTheme,
} from "react-native-paper";

import foodType from "../../assets/data/foodTypes";
import hobbiesList from "../../assets/data/hobbiesList";
import languagesList from "../../assets/data/languagesList";

export default function SignUp8Screen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.authentification.token);
  const userReducer = useSelector((state) => state.user.value);
  const theme = useTheme();
  const [favFood, setFavFood] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(userReducer);

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Ton profil</Text>
        <Text style={styles.text}>
          Dernière étape ! {"\n"}Aide-nous à te trouver le buddy idéal !
        </Text>
        <ScrollView style={styles.inputs_container}>
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
        <View>
          <Text style={styles.textButton} onPress={() => handleSuivant()}>
            Suivant
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  textButton: {
    color: "#ec6e5b",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
