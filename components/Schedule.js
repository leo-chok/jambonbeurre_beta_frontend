import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Checkbox, List, RadioButton, Divider, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { updateLunchTime } from "../reducers/user";

// Component for Schedule of Lunch Time

export default function Schedule(props) {
  const dispatch = useDispatch();
  const scheduleFromReducer = useSelector(
    (state) => state.user.value.preferences.lunchtime
  );

  const [schedule, setSchedule] = useState(
    scheduleFromReducer.map((e) => ({
      name: e.name,
      start: e.start,
      stop: e.stop,
      worked: e.worked,
    }))
  );

  useEffect(() => {
    //Deep copy the schedule array
    const deepCopySchedule = schedule.map((day) => ({
      ...day,
      start: day.start,
      stop: day.stop,
      worked: day.worked,
    }));

    // Save to reducer User

    dispatch(updateLunchTime(deepCopySchedule));
  }, [schedule]);

  const handleCheckboxPress = (index) => {
    setSchedule((prevSchedule) => {
      const newSchedule = [...prevSchedule];
      newSchedule[index].worked = !newSchedule[index].worked;
      return newSchedule;
    });
  };

  const handleRadioButtonPress = (index, type, value) => {
    setSchedule((prevSchedule) => {
      const newSchedule = [...prevSchedule];
      newSchedule[index][type] = value;
      return newSchedule;
    });
  };

  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => i.toString().padStart(2, "0") + ":00"
  );

  return (
    <ScrollView style={styles.container}>
      {schedule.map((day, index) => (
        <View key={day.name} style={styles.dayContainer}>
          <Text>{day.name}</Text>
          <Checkbox
            status={day.worked ? "checked" : "unchecked"}
            onPress={() => handleCheckboxPress(index)}
          />
          {day.worked && (
            <>
              <List.Accordion title={day.start || "Début"}>
                {timeSlots.map((slot) => (
                  <RadioButton.Item
                    key={slot}
                    label={slot}
                    value={slot}
                    status={day.start === slot ? "checked" : "unchecked"}
                    onPress={() => handleRadioButtonPress(index, "start", slot)}
                  />
                ))}
              </List.Accordion>
              <Divider />
              <List.Accordion title={day.stop || "Fin"}>
                {timeSlots.map((slot) => (
                  <RadioButton.Item
                    key={slot}
                    label={slot}
                    value={slot}
                    status={day.stop === slot ? "checked" : "unchecked"}
                    onPress={() => handleRadioButtonPress(index, "stop", slot)}
                  />
                ))}
              </List.Accordion>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    padding: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
});
