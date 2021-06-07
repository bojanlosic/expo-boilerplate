import React from "react";
import { Button, Text, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";

export default ({ logout }) => {
  return (
    <View style={style.container}>
      <Text>More</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
