import React from "react";
import { useDispatch } from "react-redux";
import ResetPasswordView from "./ResetPasswordView";

const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState({
    password: "",
    rePassword: "",
  });

  function handleTextInput(value, name) {
    setUserInfo({ ...userInfo, [name]: value });
  }

  const resetPassword = () => {
    try {
      // Send reset password to backend
      if (!userInfo.password || !userInfo.rePassword) {
        alert("You must enter password")
      }
      if (userInfo.password !== userInfo.rePassword) {
        alert("Passwords does not match")
      }
      navigation.navigate("Login");
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <ResetPasswordView
      userInfo={userInfo}
      handleTextInput={handleTextInput}
      resetPassword={resetPassword}
      navigation={navigation}
    />
  );
};

export default ResetPassword;
