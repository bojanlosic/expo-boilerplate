import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import * as types from "../redux/types/actionTypes";
import Constants from "expo-constants";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/colors/Colors";
import UserCamera from "../components/UserCamera";
import Login from "../screens/Auth/Login/LoginScreen";
import Register from "../screens/Auth/Register/RegisterScreen";
import { Tabs } from "./BottomTabNavigator";
import { storageGetItem } from "../core/storage";
import SplashScreen from "../components/SplashScreen";
import * as Notifications from "expo-notifications";
import { setNotificationAction } from "../redux/actions/app";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const LoginStack = createStackNavigator();

export default function Navigation() {
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const dispatch = useDispatch();

  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    registerForPushNotificationsAsync();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      dispatch(setNotificationAction(notification));
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: "Original Title",
  //     body: "And here is the body!",
  //     data: { someData: "goes here" },
  //   };

  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  // check if user is already logged in
  const checkUserToken = async () => {
    let token = await storageGetItem("token");
    if (token) {
      // *** Check token on backend then restore!
      dispatch({ type: types.RESTORE_TOKEN, payload: { token: token } });
    }
    dispatch({ type: types.LOADING, payload: false });
  };

  React.useEffect(() => {
    checkUserToken();
  }, [app.isLoading]);

  if (app.isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      {Constants.isDevice && app.camera ? (
        <UserCamera />
      ) : (
        <ScreenWrapper>
          <NavigationContainer>
            <LoginStack.Navigator
              screenOptions={
                {
                  headerShown: false,
                }
              }
            >
              {user.loggedIn == false ? (
                <>
                  <LoginStack.Screen name="Login" component={Login} />
                  <LoginStack.Screen name="Register" component={Register} />
                </>
              ) : (
                <LoginStack.Screen name="Home" component={Tabs} />
              )}
            </LoginStack.Navigator>
          </NavigationContainer>
        </ScreenWrapper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
