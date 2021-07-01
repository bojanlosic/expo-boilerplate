import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";

export default ({ email, setEmail, sendForgotPasswordToEmail, navigation }) => {
  return (
    <View style={style.container}>
      <Text>Recover password</Text>
      <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
      <Button title="Recover password" onPress={sendForgotPasswordToEmail} />
      <Button title="Remember password?" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};
