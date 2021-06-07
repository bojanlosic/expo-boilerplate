import React from "react";
import { Camera } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import * as types from "../redux/types/actionTypes";

export default function UserCamera() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();

  const requestCameraAccess = () => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  React.useEffect(() => {
    requestCameraAccess();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
        <Button title="Grant access" onPress={() => requestCameraAccess()} />
      </View>
    );
  }

  return (
    <Camera style={styles.camera} type={type} useCamera2Api={true}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
          }}
        >
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
          <Button
            title="Close camera"
            onPress={() => {
              dispatch({ type: types.SHOW_CAMERA, payload: false });
            }}
          />
        </View>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
