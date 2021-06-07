import React from "react";
import { AppState } from "react-native";
import * as Updates from "expo-updates";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
// import {
//   useFonts,
//   sarabun-regular,
//   sarabun-semi-bold,
//   Sarabun_700Bold,
// } from "@expo-google-fonts/sarabun";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
// import {
//   useFonts,
//   Roboto_400Regular,
//   Roboto_500Medium,
// } from "@expo-google-fonts/roboto";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [currentAppState, setCurrentAppState] = React.useState("active");
  // let [fontsLoaded] = useFonts({
  //   sarabun-regular,
  //   sarabun-semi-bold,
  //   Sarabun_700Bold,
  // });

  const handleAppStateChange = (nextAppState) => {
    setCurrentAppState(nextAppState);
    if (currentAppState === "active" && nextAppState === "active") {
      checkForUpdates();
    }
  };

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      }
    } catch (e) {}
  }

  // const loadFont = async () => {
  //   await Font.loadAsync({
  //     "lato-regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
  //     "lato-light": require("../assets/fonts/Lato/Lato-Light.ttf"),
  //     "lato-bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
  //   });
  //   setFontLoaded(true);
  // };

  React.useEffect(() => {
    //checking for over the air updates
    AppState.addEventListener("change", handleAppStateChange);
    async function loadResourcesAndDataAsync() {
      try {
        // await loadFont();
        SplashScreen.preventAutoHideAsync();
        setLoadingComplete(true);
      } catch (error) {
        console.warn(error);
      } finally {
        // setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
    checkForUpdates();
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  return isLoadingComplete;
}
