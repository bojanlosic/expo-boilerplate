import React from "react";
import { useDispatch } from "react-redux";
import ForgotPasswordView from "./ForgotPasswordView";

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState();

  const sendForgotPasswordToEmail = () => {
    try {
      // Send request to backend
      // From email navigate to ResetPassword with token for reset
      // At the moment it is skipped
      navigation.navigate("ResetPassword");
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return <ForgotPasswordView email={email} setEmail={setEmail} sendForgotPasswordToEmail={sendForgotPasswordToEmail} navigation={navigation} />;
};

export default ForgotPassword;
