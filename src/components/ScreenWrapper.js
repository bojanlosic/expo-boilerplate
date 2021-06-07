import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { initialWindowMetrics, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import SplashScreen from "./SplashScreen";

const useIsFloatingKeyboard = () => {
  const [isFloating, setFloating] = React.useState(false);
  const windowWidth = Dimensions.get("window").width;
  const onKeyboardWillChangeFrame = (event) => {
    setFloating(event.endCoordinates.width !== windowWidth);
  };

  React.useEffect(() => {
    const keyboard = Keyboard.addListener("keyboardWillChangeFrame", onKeyboardWillChangeFrame);
    return () => {
      keyboard.remove();
    };
  }, []);

  return isFloating;
};

const ScreenWrapper = ({ children }) => {
  const isFloatingKeyboard = useIsFloatingKeyboard();
  const app = useSelector((state) => state.app);
  return (
    <SafeAreaView style={styles.container} initialMetrics={initialWindowMetrics}>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView style={{ flex: 1, width: "100%" }} behavior="padding" enabled={!isFloatingKeyboard}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
              {children}
              {app.isLoadingAPI && <SplashScreen />}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView keyboardVerticalOffset={50} style={{ flex: 1, width: "100%" }} behavior="height">
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
              {children}
              {app.isLoadingAPI && <SplashScreen />}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
});
export default ScreenWrapper;
