import React from "react";
import { View, Text } from "react-native";



export default function TimerCountDown({ TimeDate }) {
    const totalMilliseconds = TimeDate.getTime(); // Get the total milliseconds from the Date object
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000).toString().padStart(2, "0");

    return (
        <View>
            <Text style={{ fontSize: 40, fontWeight: "800", color: "white" }}>{minutes}:{seconds}</Text>
        </View>
    );
};