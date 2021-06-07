import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { REGISTER } from "../../../redux/types/actionTypes";
import RegisterView from "./RegisterView";

const Register = ({ navigation }) => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleTextInput(value, name) {
    setUserInfo({ ...userInfo, [name]: value });
  }

  const registerUser = () => {
    const credentils = {
      email: userInfo.email,
      password: userInfo.password,
      passwordConfirm: userInfo.passwordConfirm,
    };
    try {
      // *** Change register url
      // await axiosService(registerConfig, credentils);
      dispatch({ type: REGISTER, payload: { token: "X", user: "Y" } });
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const dispatch = useDispatch();
  return <RegisterView userInfo={userInfo} handleTextInput={handleTextInput} registerUser={registerUser} navigation={navigation} />;
};

export default Register;
