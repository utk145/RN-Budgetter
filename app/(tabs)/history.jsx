import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimerCountDown from '../../components/Pomodoro/TimerCountDown';
import TimmerToggleBtn from '../../components/Pomodoro/TimmerToggleBtn';


const focus_time_in_minutes = 25 * 60 * 1000;
const break_time_in_minutes = 5 * 60 * 1000;
export default function History() {
  const [count, setCount] = useState(focus_time_in_minutes);
  const [timerInterval, setTimerInterval] = useState(null); // This state is to be able to reference id to clearInterval
  const [isTimerRunning, setisTimerRunning] = useState(false);
  const [mode, setMode] = useState("Focus");

  useEffect(() => {
    if (count === 0) {
      if (mode === "Focus") {
        setMode("Break");
        setCount(break_time_in_minutes);
      } else {
        setMode("Focus");
        setCount(focus_time_in_minutes)
      }
      stopTimer();
    }
  }, [count])
  const startTimer = () => {
    setisTimerRunning(true);
    const id = setInterval(() => setCount(prev => prev - 1000), 1000)
    setTimerInterval(id);
  }
  const stopTimer = () => {
    if (timerInterval != null) {
      clearInterval(timerInterval);
    }
    setisTimerRunning(false);
  }
  return (
    <View style={{ ...styles.container, ...{ backgroundColor: mode === 'Break' ? "#00A550" : "#CD5700" } }}>
      <Text style={styles.focusText}>{mode === 'Focus' ? "Stay focused, be present ⏳" : `Take a break`}</Text>
      <StatusBar style="auto" />
      <TimmerToggleBtn isTimerRunning={isTimerRunning} stopTimer={stopTimer} startTimer={startTimer} />
      <TimerCountDown TimeDate={new Date(count)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#fff"
  }
});