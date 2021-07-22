import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../../redux/actions/user";
import { REGISTER } from "../../../redux/types/actionTypes";
import { REGEX_EMAIL_MAP } from "./regexEmailMap";
import { REGEX_PASSWORD_MAP } from "./regexPasswordMap";
import RegisterView from "./RegisterView";

// EDIT CONFIG FOR REGISTRATION
const EMAIL_VALIDATION = REGEX_EMAIL_MAP.NONE;
const PASSWORD_MIN_LENGTH = 3;
const PASSWORD_CHARACTERS_VALIDATION = REGEX_PASSWORD_MAP.NONE;

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleTextInput(value, name) {
    setUserInfo({ ...userInfo, [name]: value });
  }

  const registerUser = async () => {
    const credentils = {
      email: userInfo.email,
      password: userInfo.password,
      passwordConfirm: userInfo.passwordConfirm,
    };
    if (!(userInfo.email && userInfo.password)) {
      alert(`All fields are required`);
      return;
    }
    if (EMAIL_VALIDATION && EMAIL_VALIDATION.test(userInfo.email.toLowerCase())) {
      alert(`Not a valid email address.`);
      return;
    }
    if (userInfo.password.length < PASSWORD_MIN_LENGTH) {
      alert(`Password must have more than ${PASSWORD_MIN_LENGTH} characters.`);
      return;
    }
    if (PASSWORD_CHARACTERS_VALIDATION && !PASSWORD_CHARACTERS_VALIDATION.test(userInfo.password)) {
      alert(`Password must have SOMETHING for validation.`);
      return;
    }
    if (userInfo.password !== userInfo.passwordConfirm) {
      alert("Passwords does not match");
      return;
    }
    try {
      await dispatch(registerUserAction(credentils));
      alert("Account successfully created");
      navigation.navigate("Login");
    } catch (error) {
      console.log("register page", error);
      alert(error);
    }
  };

  return <RegisterView userInfo={userInfo} handleTextInput={handleTextInput} registerUser={registerUser} navigation={navigation} />;
};

export default Register;
