import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeProvider, useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { overrideTheme, toggleTheme } = useTheme();
  const isDark = overrideTheme === "dark";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isDark ? "Dark Mode" : "Light Mode"}</Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? "#d4af37" : "#f4f3f4"}
        trackColor={{ false: "#767577", true: "#d4af37" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
});
