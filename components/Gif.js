import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";

export default function Gif(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo/logoGifOrange.gif")}
        style={styles.image}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
