import React from "react";
import { Animated, Button, Text, View } from "react-native";
import getThemeColor from "../../../constants/colors/getThemeColor";
import i18n from "../../../languages";
import getGlobalStyles from "../../../styles/app/main";
import getStyles from "./Styles";

export default ({ smaraj, showCamera, app, changeTheme, animationValue }) => {
  const styles = React.useMemo(() => getStyles(app.appTheme), [app.appTheme]);
  const globalStyles = React.useMemo(() => getGlobalStyles(app.appTheme), [app.appTheme]);

  return (
    <Animated.View
      style={[
        globalStyles.container,
        {
          backgroundColor: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [getThemeColor("background", "default"), getThemeColor("background", "dark")],
          }),
        },
      ]}
    >
      <Animated.Text
        style={[
          globalStyles.text,
          {
            color: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [getThemeColor("text", "default"), getThemeColor("text", "dark")],
            }),
          },
        ]}
      >
        {i18n.t("hello")}
      </Animated.Text>
      <Button title="Show camera" onPress={showCamera} />
      <Button title="smaraj" onPress={smaraj} />
      <Button title="Promeni temu" onPress={changeTheme} />
      <Animated.Text
        style={[
          globalStyles.text,
          {
            color: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [getThemeColor("text", "default"), getThemeColor("text", "dark")],
            }),
          },
        ]}
      >
        Your expo push token: {app.expoPushToken}
      </Animated.Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Animated.Text
          style={[
            globalStyles.text,
            {
              color: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [getThemeColor("text", "default"), getThemeColor("text", "dark")],
              }),
            },
          ]}
        >
          Title: {app.notification && app.notification.request.content.title}{" "}
        </Animated.Text>
        <Animated.Text
          style={[
            globalStyles.text,
            {
              color: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [getThemeColor("text", "default"), getThemeColor("text", "dark")],
              }),
            },
          ]}
        >
          Body: {app.notification && app.notification.request.content.body}
        </Animated.Text>
        <Animated.Text
          style={[
            globalStyles.text,
            {
              color: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [getThemeColor("text", "default"), getThemeColor("text", "dark")],
              }),
            },
          ]}
        >
          Data: {app.notification && JSON.stringify(app.notification.request.content.data)}
        </Animated.Text>
      </View>
    </Animated.View>
  );
};
