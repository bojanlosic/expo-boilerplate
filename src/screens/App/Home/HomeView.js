import React from "react";
import { Button, Text, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";

export default ({ dispatch, smaraj, SHOW_CAMERA }) => {
  return (
    <View style={style.container}>
      <Text>Home</Text>
      <Button title="Show camera" onPress={() => dispatch({ type: SHOW_CAMERA, payload: true })} />
      <Button title="smaraj" onPress={smaraj} />
    </View>
  );
};
