import React from "react";
import { useDispatch } from "react-redux";
import { LOADING_API, SHOW_CAMERA } from "../../../redux/types/actionTypes";
import HomeView from "./HomeView";
import { Audio } from "expo-av";

const Home = () => {
  const dispatch = useDispatch();
  const [sound, setSound] = React.useState();

  const smaraj = () => {
    dispatch({ type: LOADING_API, payload: true });
    console.log("POCETAK");
    setTimeout(async () => {
      console.log("KRAJ");
      dispatch({ type: LOADING_API, payload: false });
    }, 3000);
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("../../../../assets/test.mp3"));
    await sound.setIsMutedAsync(false);
    await Audio.setAudioModeAsync({ staysActiveInBackground: true });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function stopSound() {
    console.log("Stop Sound");
    await sound.stopAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return <HomeView dispatch={dispatch} SHOW_CAMERA={SHOW_CAMERA} smaraj={smaraj} playSound={playSound} stopSound={stopSound} />;
};

export default Home;
