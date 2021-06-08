import React from "react";
import { useDispatch } from "react-redux";
import { LOADING_API, SHOW_CAMERA } from "../../../redux/types/actionTypes";
import HomeView from "./HomeView";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";

// Pre-step, call this before any NFC operations
async function initNfc() {
  await NfcManager.start();
}

function readNdef() {
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };

  return new Promise((resolve) => {
    let tagFound = null;

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      tagFound = tag;
      resolve(tagFound);
      NfcManager.setAlertMessageIOS("NDEF tag found");
      NfcManager.unregisterTagEvent().catch(() => 0);
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
      if (!tagFound) {
        resolve();
      }
    });

    NfcManager.registerTagEvent();
  });
}

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    initNfc();
    readNdef();
  }, []);

  const smaraj = () => {
    dispatch({ type: LOADING_API, payload: true });
    console.log("POCETAK");
    setTimeout(async () => {
      console.log("KRAJ");
      dispatch({ type: LOADING_API, payload: false });
    }, 3000);
  };

  return <HomeView dispatch={dispatch} SHOW_CAMERA={SHOW_CAMERA} smaraj={smaraj} />;
};

export default Home;
