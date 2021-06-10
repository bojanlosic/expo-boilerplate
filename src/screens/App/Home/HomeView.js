import React from "react";
import { Button, Text, View } from "react-native";
import { mainStyle as style } from "@styles";
import styles from "./Styles";
import i18n from "../../../languages";

export default ({ dispatch, smaraj, SHOW_CAMERA, app }) => {
  return (
    <View style={style.container}>
      <Text>{i18n.t("hello")}</Text>
      <Button title="Show camera" onPress={() => dispatch({ type: SHOW_CAMERA, payload: true })} />
      <Button title="smaraj" onPress={smaraj} />
      <Text>Your expo push token: {app.expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {app.notification && app.notification.request.content.title} </Text>
        <Text>Body: {app.notification && app.notification.request.content.body}</Text>
        <Text>Data: {app.notification && JSON.stringify(app.notification.request.content.data)}</Text>
      </View>
    </View>
  );
};
