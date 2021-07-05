import React from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAppTheme } from "../../../redux/actions/app";
import { LOADING_API, SHOW_CAMERA } from "../../../redux/types/actionTypes";
import HomeView from "./HomeView";

const Home = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const animationValue = React.useRef(new Animated.Value(0)).current;
  const [animationState, setAnimationState] = React.useState(0);

  const animation = (toValue) =>
    Animated.timing(animationValue, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    });

  const showCamera = () => {
    dispatch({ type: SHOW_CAMERA, payload: true });
  };

  const smaraj = () => {
    dispatch({ type: LOADING_API, payload: true });
    console.log("POCETAK");
    setTimeout(async () => {
      console.log("KRAJ");
      dispatch({ type: LOADING_API, payload: false });
    }, 3000);
  };

  const changeTheme = () => {
    setAnimationState(animationState === 1 ? 0 : 1);
    animation(animationState === 1 ? 0 : 1).start();
    dispatch(setAppTheme(app.appTheme === "default" ? "dark" : "default"));
  };

  return <HomeView showCamera={showCamera} smaraj={smaraj} app={app} changeTheme={changeTheme} animationValue={animationValue} />;
};

export default Home;
