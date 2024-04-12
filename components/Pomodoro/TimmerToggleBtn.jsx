import React from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TimmerToggleBtn({
  isTimerRunning,
  stopTimer,
  startTimer,
}) {
  return (
    <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
      <View style={styles.viewStyle}>
        <FontAwesome
          name={isTimerRunning ? "pause" : "play"}
          color="white"
          size={100}
          style={{ alignSelf: "center" }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 5,
    width: 220,
    height: 220,
    borderRadius: 250 / 2,
    justifyContent: "center",
    borderColor: "white",
    marginVertical: 50,
  },
});
