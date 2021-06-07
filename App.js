import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation/Navigation";
import { store } from "./src/redux/store";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
