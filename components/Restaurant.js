import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Checkbox, List, RadioButton, Divider, Text } from "react-native-paper";

export default function Restaurant(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <Text style={styles.text}>{props.type}</Text>
      <Text style={styles.text}>{props.address}</Text>
      <Text style={styles.text}>{props.rating}</Text>
      <Text style={styles.text}>{props.website}</Text>
      <Text style={styles.text}>{props.location}</Text>
      <Text style={styles.text}>{props.priceLevel}</Text>
      <Text style={styles.text}>
        Ouvert aujourd'hui :{" "}
        {props.isopen ? <Text>Oui</Text> : <Text>Non</Text>}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
