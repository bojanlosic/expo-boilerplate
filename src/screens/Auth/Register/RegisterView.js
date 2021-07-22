import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";

export default ({ userInfo, handleTextInput, registerUser, navigation }) => {
  return (
    <View style={style.container}>
      <Text>Register</Text>
      <TextInput style={styles.input} placeholder="Email" value={userInfo.email} onChangeText={(text) => handleTextInput(text, "email")} />
      <TextInput style={styles.input} placeholder="Password" value={userInfo.password} onChangeText={(text) => handleTextInput(text, "password")} />
      <TextInput style={styles.input} placeholder="Confirm password" value={userInfo.passwordConfirm} onChangeText={(text) => handleTextInput(text, "passwordConfirm")} />
      <Button title="Register" onPress={registerUser} />
      <Button title="Already have account" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};
