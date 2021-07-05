import React from "react";
import { StyleSheet } from "react-native";
import getThemeColor from "../../../constants/colors/getThemeColor";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getThemeColor("primary", theme),
    },
  });
};

export default getStyles;
