import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as types from "../redux/types/actionTypes";
import * as Device from "expo-device";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import UserCamera from "../components/UserCamera";
import Login from "../screens/Auth/Login/LoginScreen";
import Register from "../screens/Auth/Register/RegisterScreen";
import { Tabs } from "./BottomTabNavigator";
import { storageGetItem } from "../core/storage";
import SplashScreen from "../components/SplashScreen";

const LoginStack = createStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();

  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.user);

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
  }, []);

  if (app.isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      {Device.isDevice && app.camera ? (
        <UserCamera />
      ) : (
        <ScreenWrapper>
          <NavigationContainer>
            <LoginStack.Navigator
              screenOptions={
                {
                  // headerShown: false,
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
