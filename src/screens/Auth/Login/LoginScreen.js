import React from "react";
import { useDispatch } from "react-redux";
import { storageSetItem } from "../../../core/storage";
import { loginUserAction } from "../../../redux/actions/user";
import LoginView from "./LoginView";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { setLoadingApiAction } from "../../../redux/actions/app";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
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
    dispatch(setLoadingApiAction(true));
    try {
      // *** Change login url
      // await axiosService(loginConfig, credentils);
      setTimeout(async () => {
        await storageSetItem("token", "X");
        dispatch(loginUserAction({ data: { token: "X", user: "Y" } }));
        dispatch(setLoadingApiAction(false));
      }, 1000);
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Logic for Google login ---- https://docs.expo.io/guides/authentication/#google
  const [request, response, promptAsync] = useAuthRequest({
    expoClientId: "920195073948-p35ddutdasugm10gifndfipr26jth4qb.apps.googleusercontent.com",
    androidClientId: "920195073948-kj2mt9mjra5jn3f38slu17at8ug0k73g.apps.googleusercontent.com",
  });

  const getUserInfo = async (token) => {
    dispatch(setLoadingApiAction(true));
    await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (json) => {
        console.log(json);
        await storageSetItem("token", token);
        dispatch(loginUserAction({ data: { token, user: json } }));
        dispatch(setLoadingApiAction(false));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    console.log(response?.type);
    if (response?.type === "success") {
      const { authentication } = response;
      // Dispatch action to get token from backend
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  return (
    <LoginView
      userInfo={userInfo}
      handleTextInput={handleTextInput}
      navigation={navigation}
      login={login}
      request={request}
      promptAsync={() => promptAsync()}
    />
  );
};

export default Login;
