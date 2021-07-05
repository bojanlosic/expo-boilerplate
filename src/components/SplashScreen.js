import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { defaultColors as Colors } from "../constants/colors/Colors";

function SplashScreen() {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.b010,
      }}
    >
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
}

export default SplashScreen;
