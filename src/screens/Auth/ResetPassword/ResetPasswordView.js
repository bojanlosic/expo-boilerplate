import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";

export default ({ userInfo, handleTextInput, resetPassword, navigation }) => {
  return (
    <View style={style.container}>
      <Text>Reset password</Text>
      <TextInput placeholder="Password" value={userInfo.password} onChangeText={(text) => handleTextInput(text, "password")} />
      <TextInput placeholder="Repeat password" value={userInfo.rePassword} onChangeText={(text) => handleTextInput(text, "rePassword")} />
      <Button title="Reset password" onPress={resetPassword} />
    </View>
  );
};
