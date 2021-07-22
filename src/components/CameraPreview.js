import React from "react";
import { Camera } from "expo-camera";
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

export const CameraPreview = ({ photo, sendPicture, closePreview }) => {
  return (
    <>
      <View>
        <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => alert("Not implemented yet")}>
          <MaterialCommunityIcons name="flash-off" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ImageBackground source={{ uri: photo && photo.uri }} style={styles.imageBackground} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center" }}>
          <TouchableOpacity activeOpacity={1} style={styles.button} onPress={closePreview}>
            <MaterialCommunityIcons name="close" size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.button} onPress={sendPicture}>
            <MaterialCommunityIcons name="send" size={48} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { width: width, height: width * (4 / 3) },
  imageBackground: { flex: 1 },
  buttonContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  button: { backgroundColor: "rgba(0,0,0,0.5)", padding: 15 },
});
