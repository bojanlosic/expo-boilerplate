import React from "react";
import { StyleSheet } from "react-native";
import getThemeColor from "../../constants/colors/getThemeColor";

const getGlobalStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getThemeColor("background", theme),
    },
    text: {
      color: getThemeColor("text", theme),
    },
  });
};

export default getGlobalStyles;
