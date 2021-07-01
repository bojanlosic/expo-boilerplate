import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";
import SplashScreen from "../../../components/SplashScreen";

export default () => {
  return (
    <View style={style.container}>
      <SplashScreen />
    </View>
  );
};
