import React from "react";
import { Camera } from "expo-camera";
import { ActivityIndicator, Button, Dimensions, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import * as types from "../redux/types/actionTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraPreview } from "./CameraPreview";
import { colors } from "../constants";
import { DEV } from "../constants/services/base";

export default function UserCamera() {
  const { height, width } = Dimensions.get("window");
  // const screenRatio = height / width;
  const camera = React.useRef();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = React.useState("4:3");
  const [ratioContainer, setRatioContainer] = React.useState(4 / 3);
  // const [imagePadding, setImagePadding] = React.useState(0);
  const [isRatioSet, setIsRatioSet] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState();
  const [imageProccessing, setImageProccessing] = React.useState(false);
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

  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await camera.current.getSupportedRatiosAsync();
      console.log(ratios);
      let found = false;
      ratios.forEach((ratio) => {
        if (ratio === "4:3") {
          found = true;
          return;
        }
      });
      if (!found) {
        setRatio(ratios[0]);
        let pickedRatio = ratios[0].split(":");
        setRatioContainer(pickedRatio[0] / pickedRatio[1]);
      }
      return;
      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const flipCamera = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  const takePicture = async () => {
    if (!camera.current) return;
    console.log(new Date());
    let image = await new Promise(async (resolve) => {
      await camera.current.takePictureAsync({ onPictureSaved: resolve });
      await camera.current.pausePreview();
      setImageProccessing(true);
    });
    // await camera.current.resumePreview();
    // const data = await camera.current.takePictureAsync();
    console.log(new Date());
    // In case of problems with android camera
    // if (Platform.OS === "ios") {
    // await camera.current.pausePreview();
    // }
    setImageProccessing(false);
    setImagePreview(image);
  };

  const sendPicture = async () => {
    const image = await fetch(imagePreview.uri);
    const imgBlob = await image.blob();
    const SERVER_URL = DEV;
    let imageName = imagePreview.uri.split("/");
    imageName = imageName[imageName.length - 1];
    let response = await fetch(`${SERVER_URL}/upload-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: imageName }),
    });
    let responseJson = await response.json();
    await closePreview();
    response = await fetch(`${SERVER_URL}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-File-Name": imageName,
        "X-File-Id": responseJson.fileId,
      },
      body: imgBlob,
    });
  };

  const closeCamera = () => {
    dispatch({ type: types.SHOW_CAMERA, payload: false });
  };

  const closePreview = async () => {
    setImagePreview(null);
    // setCameraReady();
    // if (Platform.OS === "ios") {
    camera.current && (await camera.current.resumePreview());
    // }
  };

  return (
    <View style={styles.container}>
      {imagePreview ? (
        <CameraPreview photo={imagePreview} sendPicture={sendPicture} closePreview={closePreview} />
      ) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Platform.OS === "ios" ? 10 : 0, marginHorizontal: 10 }}>
            <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => alert("Not implemented yet")}>
              <MaterialCommunityIcons name="flash-off" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => alert("Not implemented yet")}>
              <MaterialCommunityIcons name="white-balance-auto" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.button} onPress={closeCamera}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Camera
            style={[styles.camera, { width: width, height: width * ratioContainer }]}
            type={type}
            ref={camera}
            ratio={ratio}
            useCamera2Api={true}
            onCameraReady={setCameraReady}
          ></Camera>
          <View style={styles.buttonContainer}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity activeOpacity={1} style={styles.bottomButton} onPress={closeCamera}>
                <MaterialCommunityIcons name="close" size={48} color="white" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.bottomButton} onPress={takePicture}>
                <MaterialCommunityIcons name="circle-outline" size={64} color="white" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.bottomButton} onPress={flipCamera}>
                <MaterialCommunityIcons name="repeat" size={42} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {imageProccessing && (
        <View style={{ ...StyleSheet.absoluteFill, flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <ActivityIndicator size="large" color={colors.default.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", marginTop: StatusBar.currentHeight },
  camera: { width: "100%" },
  buttonContainer: { width: "100%", justifyContent: "flex-end", alignItems: "center" },
  button: { alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 15 },
  bottomButton: { flex: 1, alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 15 },
  text: { fontSize: 18, color: "white" },
});
