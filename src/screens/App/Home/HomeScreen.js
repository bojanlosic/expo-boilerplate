import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_API, SHOW_CAMERA } from "../../../redux/types/actionTypes";
import HomeView from "./HomeView";

const Home = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const smaraj = () => {
    dispatch({ type: LOADING_API, payload: true });
    console.log("POCETAK");
    setTimeout(async () => {
      console.log("KRAJ");
      dispatch({ type: LOADING_API, payload: false });
    }, 3000);
  };

  return <HomeView dispatch={dispatch} SHOW_CAMERA={SHOW_CAMERA} smaraj={smaraj} app={app} />;
};

export default Home;
