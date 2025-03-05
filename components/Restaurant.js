import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Checkbox, List, RadioButton, Divider, Text } from "react-native-paper";

export default function Restaurant(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.container}>{props.data.data.name}</Text>
      <Text style={styles.container}>{props.data.data.address}</Text>
      <Text style={styles.container}>{props.data.data.rating}</Text>
      <Text style={styles.container}>{props.data.data.website}</Text>
      <Text style={styles.container}>{props.data.data.priceLevel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
