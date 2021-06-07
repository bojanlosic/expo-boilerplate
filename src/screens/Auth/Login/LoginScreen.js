import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { axiosService } from "../../../core/axios";
import { loginConfig } from "../../../core/axios/routes";
import { storageSetItem } from "../../../core/storage";
import { loginUser } from "../../../redux/actions/user";
import { LOADING, LOGIN } from "../../../redux/types/actionTypes";
import LoginView from "./LoginView";

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });

  function handleTextInput(value, name) {
    setUserInfo({ ...userInfo, [name]: value });
  }

  const login = async () => {
    const credentils = {
      email: userInfo.email,
      password: userInfo.password,
    };
    dispatch({ type: LOADING, payload: true });
    try {
      // *** Change login url
      // await axiosService(loginConfig, credentils);
      setTimeout(async () => {
        await storageSetItem("token", "X");
        dispatch(loginUser({ data: { token: "X", user: "Y" } }));
        dispatch({ type: LOADING, payload: false });
      }, 3000);
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const dispatch = useDispatch();
  return <LoginView userInfo={userInfo} handleTextInput={handleTextInput} navigation={navigation} login={login} />;
};

export default Login;
