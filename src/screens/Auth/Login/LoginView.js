import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";

export default ({ userInfo, handleTextInput, login, navigation, request, promptAsync }) => {
  return (
    <View style={style.container}>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={userInfo.email} onChangeText={(text) => handleTextInput(text, "email")} />
      <TextInput placeholder="Password" value={userInfo.password} onChangeText={(text) => handleTextInput(text, "password")} />
      <Button title="Log in" onPress={login} />
      <Button title="Don't have account?" onPress={() => navigation.navigate("Register")} />
      {/* Google login */}
      <Button disabled={!request} title="Google Login" onPress={promptAsync} />
    </View>
  );
};
