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
  Chip,
} from "react-native-paper";

import Schedule from "../components/Schedule";
import foodType from "../assets/data/foodTypes";
import hobbiesList from "../assets/data/hobbiesList";

export default function ProfileEditionScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [work, setWork] = useState("");
  const [bio, setBio] = useState("");
  const [favFood, setFavFood] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [lunchTime, setLunchTime] = useState([]);

  useEffect(() => {
    // fetch user data
    fetch("http://10.230.187.71:3000/users/t1HwP0cTMuMK3IGu4DRXzQqf4XToT_EO")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userInfos[0]);
        setUsername(userData.infos.username);
        setFirstname(userData.infos.firstname);
        setLastname(userData.infos.lastname);
        setWork(userData.description.work);
        setBio(userData.description.bio);
        setFavFood(userData.preferences.favFood);
      });
  }, []);

  function addTypeFood(type) {
    if (favFood.includes(type)) {
      setFavFood(favFood.filter((e) => e !== type));
    } else {
      setFavFood([...favFood, type]);
    }
  }

  function addHobbies(type) {
    if (hobbies.includes(type)) {
      setHobbies(hobbies.filter((e) => e !== type));
    } else {
      setHobbies([...hobbies, type]);
    }
  }

  function handleSubmit() {

   

    const data = {
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
        favFood: favFood,
        hobbies: hobbies,
      },
    };
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Profile Editor</Text>
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
        <Text style={styles.title}>Vous déjeunez à quelle heure ?</Text>
        <List.Accordion title="Créneaux Déjeuner" style={styles.inputList}>
          <Schedule data={userData?.preferences?.lunchtime} />
        </List.Accordion>



        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Text style={styles.title}>Type de cuisine préférée</Text>
        <View style={styles.typeFoodContainer}>
          {foodType.map((type) => (
            <Button
              key={type}
              // Le mode du bouton est en fonction de si le type de cuisine est dans le tableau favFood ou non
              mode={(favFood.includes(type) && "contained") || "outlined"}
              onPress={() => addTypeFood(type)}
              style={styles.typeFoodButton}
            >
              {type}
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
              style={styles.hobbiesButton}
            >
              {type}
            </Button>
          ))}
        </View>
      </ScrollView>
      <View style={styles.submitContainer}>
        <Button mode="contained" onPress={() => handleSubmit()}>
          Submit
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
    backgroundColor: "#ffffff",
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
  typeFoodButton: {
    width: "40%",
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
  hobbiesButton: {
    width: "40%",
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
});
